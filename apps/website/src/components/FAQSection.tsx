import React from "react";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      question: "How does Compressly eliminate cloud image processing costs?",
      answer:
        "Compressly compresses and resizes user images directly inside the user's browser before upload using the native Canvas API and OffscreenCanvas in Web Workers, saving up to 95% on S3 storage and Lambda transformation fees.",
    },
    {
      question: "Does Compressly block the main UI thread during compression?",
      answer:
        "No. Compressly executes compression pipelines inside dedicated Web Workers off the main thread with zero UI lag or dropped animation frames, even when compressing multiple high-resolution photos concurrently.",
    },
    {
      question: "Does Compressly fix iPhone EXIF orientation issues?",
      answer:
        "Yes. Compressly automatically normalizes EXIF rotation for iPhone and camera photos using modern browser standards, eliminating orientation distortion without adding heavy external EXIF parsing libraries.",
    },
    {
      question: "Is Compressly compatible with Next.js App Router and Server-Side Rendering?",
      answer:
        "Yes. Compressly includes robust SSR guards and universal exports (ESM & CJS), ensuring seamless compatibility with Next.js, Nuxt, Remix, and SvelteKit without 'window is not defined' errors.",
    },
    {
      question: "What output formats are supported by Compressly?",
      answer:
        "Compressly supports modern WebP, standard JPEG/JPG, and PNG output formats with adaptive fallback mechanisms tailored to browser compatibility.",
    },
    {
      question: "Can I enforce an exact maximum file size target?",
      answer:
        "Yes! Using the targetSizeMB parameter, Compressly performs an intelligent adaptive optimization loop to hit your target file size constraint while preserving maximal visual fidelity.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-6 max-w-4xl mx-auto border-t border-white/5 scroll-mt-24" aria-labelledby="faq-heading">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-2 text-xs">
          Frequently Asked Questions
        </Badge>
        <h2 id="faq-heading" className="text-3xl font-bold text-white mb-3">
          Client-Side Image Compression FAQ
        </h2>
        <p className="text-gray-400 text-sm">
          Everything you need to know about offloading media optimization to the browser.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-2xl bg-white/[0.02] border border-white/5 p-5 transition-colors hover:border-indigo-500/20 open:bg-white/[0.04] open:border-indigo-500/30"
          >
            <summary className="flex items-center justify-between cursor-pointer list-none text-base font-semibold text-white group-hover:text-indigo-300">
              <span className="flex items-center gap-3">
                <HelpCircle className="size-4 text-indigo-400 shrink-0" />
                {faq.question}
              </span>
              <span className="text-xs text-gray-500 transition-transform group-open:rotate-180">
                ▼
              </span>
            </summary>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed pl-7">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
