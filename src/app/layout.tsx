import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "For the Artist · A Tribute",
  description:
    "A little corner of the internet made with love, celebrating a wonderful painter & event stylist. Happy Artist Day.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%230a0d16'/%3E%3Cpath d='M16 5a11 11 0 1 0 0 22c1.8 0 2.6-1.2 2.6-2.3 0-1.6-1.4-1.9-1.4-3.2 0-1 .8-1.8 1.9-1.8h2.2A5.7 5.7 0 0 0 27 14C27 8.9 22 5 16 5Z' fill='%23e4b95b'/%3E%3Ccircle cx='11' cy='12' r='1.8' fill='%230a0d16'/%3E%3Ccircle cx='16.5' cy='9.5' r='1.8' fill='%230a0d16'/%3E%3Ccircle cx='21' cy='13' r='1.8' fill='%230a0d16'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${manrope.variable} antialiased bg-ink text-cream font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
