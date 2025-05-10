import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "@/providers/tanstack-provider";

// Carregue a fonte Poppins
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Adicione os pesos que quiser usar
});

export const metadata: Metadata = {
  title: "Tracker de Veículos - Thiago Suzuki",
  description: "Rastreio e Consulta de Veículos",
  icons: {
    icon: [
      { url: "/favicon.ico" }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanstackProvider>
        <body className={`${poppins.variable} antialiased`}>
          {children}
        </body>
      </TanstackProvider>
    </html>
  );
}