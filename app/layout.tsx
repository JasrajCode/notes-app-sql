import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes App with SQL",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#222] text-slate-300`}>
        <div className="max-w-3xl mx-auto p-4">
          <Navbar />
            <div className="mt-8">
              {children}
            </div>
        </div>
      </body>
    </html>
  );
}
