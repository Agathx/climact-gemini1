// This layout can be used for routes that require the main app shell (sidebar, header, etc.)
// but might have specific sub-layouts or context.
// For now, it's a simple pass-through.

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
