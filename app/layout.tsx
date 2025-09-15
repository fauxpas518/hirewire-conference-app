import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { BottomNav } from "@/components/bottom-nav";
import { AIChatFab } from "@/components/ai-chat-fab";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HireWire - Conference Networking App",
  description: "Connect, learn, and grow at the UI/UX, Product & Data Conference",
  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    title: "HireWire",
    statusBarStyle: "default"
  },
  icons: {
    icon: [
      { url: "/placeholder-logo.png", sizes: "192x192", type: "image/png" },
      { url: "/placeholder-logo.png", sizes: "512x512", type: "image/png" }
    ],
    apple: "/placeholder-logo.png"
  }
}

// Moved themeColor to the new viewport export as per Next.js 15 API
export const viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
          <main className="pb-20">{children}</main>
          <BottomNav />
          <AIChatFab />
        </div>
      </body>
    </html>
  )
}
