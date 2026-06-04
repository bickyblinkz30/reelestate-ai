import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const playfair = Playfair_Display({ variable: "--font-serif", subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "ReelEstate AI — Cinematic listing videos in 60 seconds",
  description:
    "Drop your listing photos. Get back a cinematic video with smooth camera movement, professional voiceover, and ambient music.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a]">{children}</body>
    </html>
  )
}
