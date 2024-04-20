import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RandMProvider } from "@/context/RandMContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick & Morty Challenge",
  description: "Shows characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: any;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RandMProvider>{children}</RandMProvider>
      </body>
    </html>
  );
}
