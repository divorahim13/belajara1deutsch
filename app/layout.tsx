import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Deutsch Pintar | Platform Manajemen Kelas Bahasa Jerman",
  description: "Platform LMS B2B untuk institusi bahasa Jerman dengan evaluasi AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} antialiased`}
    >
      <body className={`w-full min-h-screen overflow-x-hidden ${plusJakartaSans.variable} font-[family-name:var(--font-jakarta)]`}>{children}</body>
    </html>
  );
}
