import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siyoni — Igitabo cy'Amasengesho",
  description:
    "Amasengesho y'Umukristu mu Kinyarwanda — Rozari, Novena, Misa y'Umunsi n'Indirimbo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="rw">
      <body className={`${cormorant.variable} ${inter.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
