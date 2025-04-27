"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function DebugInfo() {
  const pathname = usePathname()
  const router = useRouter()
  const [visible, setVisible] = useState(true)
  const [expanded, setExpanded] = useState(false)

  if (!visible) return null

  return (
    <div
      className={`fixed ${expanded ? "top-0 left-0 right-0 max-w-md mx-auto" : "bottom-24 right-4 w-auto"} bg-gray-800/80 backdrop-blur-sm text-white p-2 text-xs z-50 rounded-lg border border-gray-700`}
    >
      {expanded ? (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div>
              <p>
                <strong>Current path:</strong> {pathname}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-xs"
                onClick={() => router.push("/dashboard/home")}
              >
                Home
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-xs"
                onClick={() => router.push("/dashboard/profile")}
              >
                Profile
              </Button>
              <Button size="sm" variant="outline" className="h-6 text-xs" onClick={() => setExpanded(false)}>
                Minimize
              </Button>
              <Button size="sm" variant="outline" className="h-6 text-xs" onClick={() => setVisible(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600"
        >
          🛠️
        </button>
      )}
    </div>
  )
}
