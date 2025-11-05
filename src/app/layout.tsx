import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@styles/globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SunGod Lens Visualizer",
  description: "An interactive product visualization experience that lets users explore and preview SunGod lens and frame combinations in real time. Built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: [
    "SunGod",
    "Next.js",
    "React",
    "TypeScript",
    "Lens Visualizer",
    "3D Product Visualization",
    "Frontend Development",
    "Backend Integration",
  ],
  authors: [
    { name: "Tobi Olanitori", url: "https://intuneteq.com" },
  ],
  openGraph: {
    title: "SunGod Lens Visualizer",
    description: "An immersive interface for customizing and previewing SunGod eyewear combinations in real time.",
    url: "https://lens-scene-visualizer.intuneteq.com/",
    siteName: "Tobi Olanitori | Portfolio",
    images: [
      {
        url: "/og-sungod-preview.png",
        width: 1200,
        height: 630,
        alt: "SunGod Lens Visualizer preview",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SunGod Lens Visualizer",
    description: "A responsive product visualization app for SunGod eyewear, built with Next.js and TypeScript.",
    creator: "@tune_orisa",
    images: ["/og-sungod-preview.png"],
  },
  themeColor: "#111827",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  category: "portfolio",
};

type Props = {
  controls: React.ReactNode
  previews: React.ReactNode
}

export default function RootLayout({ controls, previews }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-900`}
      >
        <main className="w-full flex justify-start items-start p-3 bg-gray-900 overflow-hidden">
          <aside className="w-[30%] border-r border-gray-200 h-screen bg-background rounded-l-lg">
            {controls}
          </aside>
          <section className="w-[70%] bg-background h-screen relative rounded-r-lg overflow-hidden">
            {previews}
          </section>
        </main>
      </body>
    </html>
  );
}
