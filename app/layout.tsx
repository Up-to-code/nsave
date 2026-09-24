import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Open a Global USD Account and Send Money Today | nsave',
  description: 'Open a global USD account with nsave. Get U.S. account and routing numbers to receive ACH payments and send money internationally with low fees.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="stylesheet" href="/nsave-core.css" />
      </head>
      <body className="antialiased bg-white text-grey-900 selection:bg-brand selection:text-black">
        {children}
      </body>
    </html>
  );
}
