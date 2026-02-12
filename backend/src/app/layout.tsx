import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tasks Generator API',
  description: 'AI-powered task breakdown generator API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
