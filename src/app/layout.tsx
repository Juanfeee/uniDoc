import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { public_Sans } from "./ui/fonts";
import Header from "./componentes/header";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniDoc",
  description: "uniDoc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">

        
      <body className={`${public_Sans.className} antialiased flex flex-col gap-y-8 h-screen`}>
        {children}

    </body>
   </html>
  );
}
