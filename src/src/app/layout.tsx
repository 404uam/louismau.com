import type { Metadata } from "next";
import { Instrument_Sans, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Louis Mau | Photography + Software",
  description:
    "Portfolio for Louis Mau featuring photography and software engineering work.",
  openGraph: {
    title: "Louis Mau | Photography + Software",
    description:
      "Portfolio for Louis Mau featuring photography and software engineering work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Louis Mau | Photography + Software",
    description:
      "Portfolio for Louis Mau featuring photography and software engineering work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${sourceCodePro.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
