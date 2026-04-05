import type { Metadata } from "next";
import { Plus_Jakarta_Sans, GFS_Didot } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const gfsDidot = GFS_Didot({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-didot",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "any" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  title: "Heavenly Liberation Global Assembly",
  description:
    "A Spirit-filled, Word-centered church committed to transforming lives through the love and power of Jesus Christ.",
  keywords: ["church", "worship", "Heavenly Liberation", "Global Assembly", "faith", "sermons"],
  openGraph: {
    title: "Heavenly Liberation Global Assembly",
    description: "Where Heaven Touches Earth — A Place of Healing, Restoration, and Purpose.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${gfsDidot.variable} scroll-smooth`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
