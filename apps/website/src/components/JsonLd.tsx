import React from "react";

interface JsonLdProps {
  siteUrl: string;
}

export function JsonLd({ siteUrl }: JsonLdProps) {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Compressly",
    operatingSystem: "Any",
    applicationCategory: "DeveloperApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Ultra-fast, zero-dependency client-side image compression & optimization library for Next.js, React, Vue and Vanilla JS with Web Worker support.",
    url: siteUrl,
    downloadUrl: "https://www.npmjs.com/package/compressly",
    softwareVersion: "0.1.0",
    author: {
      "@type": "Person",
      name: "Mostafa Mohamed Abdalla",
      url: "https://github.com/Mostafashadow1",
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Compressly",
    url: siteUrl,
    description:
      "Client-side image compression library with zero cloud costs and off-thread Web Worker execution.",
    publisher: {
      "@type": "Person",
      name: "Mostafa Mohamed Abdalla",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does Compressly eliminate cloud image processing costs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Compressly compresses and resizes user images directly inside the user's browser before upload using the native Canvas API and OffscreenCanvas in Web Workers, saving up to 95% on S3 storage and Lambda transformation fees.",
        },
      },
      {
        "@type": "Question",
        name: "Does Compressly block the main UI thread during compression?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Compressly executes compression pipelines inside dedicated Web Workers off the main thread with zero UI lag or dropped animation frames, even when compressing multiple high-resolution photos concurrently.",
        },
      },
      {
        "@type": "Question",
        name: "Does Compressly fix iPhone EXIF orientation issues?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Compressly automatically normalizes EXIF rotation for iPhone and camera photos using modern browser standards, eliminating orientation distortion without adding heavy external EXIF parsing libraries.",
        },
      },
      {
        "@type": "Question",
        name: "Is Compressly compatible with Next.js App Router and Server-Side Rendering?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Compressly includes robust SSR guards and universal exports (ESM & CJS), ensuring seamless compatibility with Next.js, Nuxt, Remix, and SvelteKit without 'window is not defined' errors.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
