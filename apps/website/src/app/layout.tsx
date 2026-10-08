import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://compress-ly.vercel.app/";

export const viewport: Viewport = {
  themeColor: "#080c15",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Compressly — Fast Client-Side Image Compression Library",
    template: "%s | Compressly",
  },
  description:
    "Ultra-fast, zero-dependency client-side image compression for Next.js, React & Web Workers. Shrink images by 90%+ in browser with $0 cloud cost.",
  keywords: [
    "client-side image compression",
    "image compression library",
    "browser image optimizer",
    "nextjs image compression",
    "react image compressor",
    "web worker image compression",
    "canvas image resize",
    "exif orientation fix",
    "compressly",
    "zero cloud cost image processing",
  ],
  authors: [
    {
      name: "Mostafa Mohamed Abdalla",
      url: "https://github.com/Mostafashadow1",
    },
  ],
  creator: "Mostafa Mohamed Abdalla",
  publisher: "Mostafa Mohamed Abdalla",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Compressly",
    title: "Compressly — Fast Client-Side Image Compression Library",
    description:
      "Ultra-fast, zero-dependency client-side image compression for Next.js, React & Web Workers. Shrink images by 90%+ in browser with $0 cloud cost.",
    images: [
      {
        url: "/cover.jpeg",
        width: 1200,
        height: 630,
        alt: "Compressly - Zero-Dependency Client-Side Image Compression",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compressly — Fast Client-Side Image Compression Library",
    description:
      "Ultra-fast, zero-dependency client-side image compression for Next.js, React & Web Workers. Shrink images by 90%+ in browser with $0 cloud cost.",
    images: ["/cover.jpeg"],
    creator: "@Mostafashadow1",
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Core Web Vitals Resource Hints */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="antialiased min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
        <JsonLd siteUrl={SITE_URL} />
        {children}
        <Toaster richColors position="top-right" theme="dark" closeButton />
      </body>
    </html>
  );
}
