import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agregar experiencia",
  description: "Agrega tu experiencia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src= '/imagenes/logo.png'  alt="Logo" className="h-6" />
          <span className="text-lg font-semibold">UniDoc</span>
        </div>

        {/* Menú */}
        <div className="hidden md:flex gap-6 text-gray-700">
          <a href="#" className="hover:text-blue-600">Inicio</a>
          <a href="#" className="hover:text-blue-600">Datos personales</a>
          <a href="#" className="hover:text-blue-600">Normativas</a>
        </div>

        {/* Iconos de notificación y usuario */}
        <div className="flex items-center gap-4">
          <button className="bg-gray-100 p-2 rounded-full">
            
          </button>
          <img 
            src="imagenes/usuario.png" 
            alt="Usuario" 
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </nav>
      
        {children}
      </body>
    </html>
  );
}
