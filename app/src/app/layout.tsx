import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "MojGazda — Upoznaj svog gazdu",
  description:
    "Anonimne recenzije poslodavaca, plaće i ocjene šefova u Sloveniji, Hrvatskoj, Srbiji i BiH. Saznaj kakav je tvoj gazda prije nego prihvatiš posao.",
  keywords: [
    "recenzije poslodavaca",
    "plače",
    "gazda ocena",
    "employer reviews",
    "Slovenija",
    "Hrvatska",
    "Srbija",
    "BiH",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
