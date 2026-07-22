import { NextResponse } from "next/server";
import { z } from "zod";
import Stripe from "stripe";
import {
  ADDONS,
  computeTotal,
  getPackage,
  isOpenDay,
  type AddonId,
  type PackageId,
} from "@/lib/packages";

const bodySchema = z.object({
  packageId: z.string(),
  guests: z.number().int().min(1).max(20),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slot: z.string().min(4).max(5),
  addonIds: z.array(z.string()).default([]),
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  message: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = bodySchema.parse(json);

    const packageId = data.packageId as PackageId;
    const pkg = getPackage(packageId);
    if (!pkg) {
      return NextResponse.json({ error: "Formule inconnue" }, { status: 400 });
    }

    const visitDate = new Date(data.date + "T12:00:00");
    if (Number.isNaN(visitDate.getTime()) || !isOpenDay(visitDate)) {
      return NextResponse.json(
        { error: "Date non disponible (mardi–samedi uniquement)" },
        { status: 400 }
      );
    }

    if (!pkg.slots.includes(data.slot)) {
      return NextResponse.json({ error: "Créneau invalide" }, { status: 400 });
    }

    const guests = Math.min(
      pkg.maxGuests,
      Math.max(pkg.minGuests, data.guests)
    );

    const addonIds = data.addonIds.filter((id) =>
      ADDONS.some((a) => a.id === id)
    ) as AddonId[];

    const totals = computeTotal({ packageId, guests, addonIds });

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";

    const summary = [
      pkg.name,
      `${guests} pers.`,
      data.date,
      data.slot,
      ...addonIds.map((id) => ADDONS.find((a) => a.id === id)?.name),
    ]
      .filter(Boolean)
      .join(" · ");

    const secret = process.env.STRIPE_SECRET_KEY;

    // Mode démo / sans Stripe : demande de réservation enregistrée
    if (!secret) {
      console.info("[resa] demande sans Stripe", {
        ...data,
        guests,
        total: totals.total,
        summary,
      });
      const q = new URLSearchParams({
        mode: "request",
        total: String(totals.total),
        ref: `REQ-${Date.now().toString(36).toUpperCase()}`,
      });
      return NextResponse.json({
        redirect: `${origin}/succes?${q.toString()}`,
        mode: "request",
      });
    }

    const stripe = new Stripe(secret);

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      totals.lines.map((line) => ({
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(line.amount * 100),
          product_data: {
            name: line.label,
            description: summary.slice(0, 400),
          },
        },
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: data.email,
      line_items,
      success_url: `${origin}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/reserver?cancelled=1`,
      locale: "fr",
      metadata: {
        packageId,
        guests: String(guests),
        date: data.date,
        slot: data.slot,
        addonIds: addonIds.join(","),
        name: data.name,
        phone: data.phone || "",
        message: (data.message || "").slice(0, 450),
        total: String(totals.total),
      },
      payment_intent_data: {
        description: `TR Évêque · ${summary}`,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Impossible de créer la session Stripe" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: e.flatten() },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}
