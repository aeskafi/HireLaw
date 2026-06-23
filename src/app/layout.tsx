import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HireLaw® | Trusted Legal Solutions for Your Peace of Mind",
  description: "At HireLaw, we are committed to providing exceptional legal services tailored to your unique needs. Connect with our expert team in Corporate, Family, and Real Estate Law.",
  keywords: "HireLaw, legal services, corporate law, family law, real estate law, premium law firm, trial attorneys, legal representation",
  authors: [{ name: "HireLaw®" }],
  openGraph: {
    title: "HireLaw® | Trusted Legal Solutions",
    description: "At HireLaw, we are committed to providing exceptional legal services tailored to your unique needs.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F9F8F3] text-[#111111]">
        {children}
      </body>
    </html>
  );
}
