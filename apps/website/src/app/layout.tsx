import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compressly — Zero-dependency Client-Side Image Compression Library",
  description:
    "Ultra-fast, zero-dependency client-side image compression & optimization library for Next.js, React, Vue & Vanilla JS with Web Worker support.",
  keywords: [
    "image-compression",
    "client-side",
    "react",
    "nextjs",
    "web-worker",
    "canvas",
    "compressly",
  ],
  authors: [
    {
      name: "Mostafa Mohamed Abdalla",
      url: "https://github.com/Mostafashadow1",
    },
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
        <Toaster richColors position="top-right" theme="dark" closeButton />
      </body>
    </html>
  );
}
