import type React from "react"
import MobileLayout from "@/components/mobile-layout"
import { DebugInfo } from "@/components/debug-info"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DebugInfo />
      <MobileLayout>{children}</MobileLayout>
    </>
  )
}
