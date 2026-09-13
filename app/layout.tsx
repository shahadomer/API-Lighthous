import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "API Lighthouse: API marketplace, hosting and free directory",
    template: "%s | API Lighthouse",
  },
  description:
    "API Lighthouse is a marketplace, a hosting platform and a free directory for APIs. Discover services, compare them honestly, and start using them in minutes.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
