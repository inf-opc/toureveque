export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="embed-root bg-white">{children}</div>;
}
