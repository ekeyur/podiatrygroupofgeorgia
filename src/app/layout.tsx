import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: {
    default: "Podiatry Group of Georgia | Foot & Ankle Specialist",
    template: "%s | Podiatry Group of Georgia",
  },
  description:
    "Expert foot and ankle care in Marietta, GA. Laser therapy, diabetic foot care, foot surgery, medical spa, and custom orthotics. Board-certified podiatrists. Call (404) 806-3731.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.podiatrygroupofgeorgia.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Podiatry Group of Georgia",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Mobile floating CTA */}
          <div className="floating-cta">
            <a
              href="tel:4048063731"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-500 text-white font-semibold rounded-full shadow-2xl shadow-brand-500/40 active:scale-95 transition-transform"
            >
              📞 Call (404) 806-3731
            </a>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
