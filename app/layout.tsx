import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import SupabaseProvider from "@/components/supabase-provider"
import localFont from "next/font/local"

// Load Mont font locally
const montFont = localFont({
  src: [
    {
      path: "../public/fonts/Mont-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Mont-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Mont-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mont",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montFont.variable} font-sans`}>
        <SupabaseProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}


