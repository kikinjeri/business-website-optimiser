// app/card/[slug]/layout.tsx
export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
