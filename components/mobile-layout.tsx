"use client"
import React from "react"
import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Plus, Heart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface MobileLayoutProps {
  children: React.ReactNode
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  // Avoid hydration error: only render theme-dependent classes after mount
  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className={"relative min-h-screen bg-background flex flex-col items-center pb-16"}>
      {/* Main Content - Constrained width */}
      <div className="w-full max-w-md mx-auto px-4 pb-20 mt-4">{children}</div>

      {/* Bottom Navigation - Fixed at the bottom and centered */}
      <div className="fixed bottom-0 w-full flex justify-center z-50">
        <nav
          className={"w-full max-w-md bg-background flex justify-between items-center py-3 px-6"}
        >
          <Link
            href="/dashboard/home"
            className={cn(
              "group flex flex-col items-center text-gray-400 rounded-full px-4 py-2",
              isActive("/dashboard/home") && (isDark ? "bg-[#C1FF72] text-black" : "bg-blue-500 text-white"),
              !isActive("/dashboard/home") && "hover:bg-blue-500 dark:hover:bg-[#C1FF72] hover:text-white dark:hover:text-black"
            )}
          >
            <Home className={cn("h-6 w-6",
              isActive("/dashboard/home") && (isDark ? "text-black" : "text-white"),
              !isActive("/dashboard/home") && "group-hover:text-white dark:group-hover:text-black"
            )} />
            <span className={cn("text-xs mt-1 font-medium",
              isActive("/dashboard/home") && (isDark ? "text-black" : "text-white"),
              !isActive("/dashboard/home") && "group-hover:text-white dark:group-hover:text-black"
            )}>Home</span>
          </Link>

          <Link
            href="/dashboard/search"
            className={cn(
              "group flex flex-col items-center text-gray-400 rounded-full px-4 py-2",
              isActive("/dashboard/search") && (isDark ? "bg-[#C1FF72] text-black" : "bg-blue-500 text-white"),
              !isActive("/dashboard/search") && "hover:bg-blue-500 dark:hover:bg-[#C1FF72] hover:text-white dark:hover:text-black"
            )}
          >
            <Search className={cn("h-6 w-6",
              isActive("/dashboard/search") && (isDark ? "text-black" : "text-white"),
              !isActive("/dashboard/search") && "group-hover:text-white dark:group-hover:text-black"
            )} />
            <span className={cn("text-xs mt-1 font-medium",
              isActive("/dashboard/search") && (isDark ? "text-black" : "text-white"),
              !isActive("/dashboard/search") && "group-hover:text-white dark:group-hover:text-black"
            )}>Search</span>
          </Link>

          <Link
            href="/onboarding"
            className="flex flex-col items-center"
          >
            <div className="bg-blue-500 rounded-full p-2">
              <Plus className="h-6 w-6 text-white" />
            </div>
          </Link>

          <Link
            href="/dashboard/favorites"
            className={cn(
              "group flex flex-col items-center text-gray-400 rounded-full px-4 py-2",
              isActive("/dashboard/favorites") && (isDark ? "bg-[#C1FF72] text-black" : "bg-blue-500 text-white"),
              !isActive("/dashboard/favorites") && "hover:bg-blue-500 dark:hover:bg-[#C1FF72] hover:text-white dark:hover:text-black"
            )}
          >
            <Heart className={cn("h-6 w-6",
              isActive("/dashboard/favorites") && (isDark ? "text-black" : "text-white"),
              !isActive("/dashboard/favorites") && "group-hover:text-white dark:group-hover:text-black"
            )} />
            <span className={cn("text-xs mt-1 font-medium",
              isActive("/dashboard/favorites") && (isDark ? "text-black" : "text-white"),
              !isActive("/dashboard/favorites") && "group-hover:text-white dark:group-hover:text-black"
            )}>Favorites</span>
          </Link>

          <Link
            href="/dashboard/profile"
            className={cn(
              "group flex flex-col items-center text-gray-400 rounded-full px-4 py-2",
              isActive("/dashboard/profile") && (isDark ? "bg-[#C1FF72] text-black" : "bg-blue-500 text-white"),
              !isActive("/dashboard/profile") && "hover:bg-blue-500 dark:hover:bg-[#C1FF72] hover:text-white dark:hover:text-black"
            )}
          >
            <User className={cn("h-6 w-6",
              isActive("/dashboard/profile") && (isDark ? "text-black" : "text-white"),
              !isActive("/dashboard/profile") && "group-hover:text-white dark:group-hover:text-black"
            )} />
            <span className={cn("text-xs mt-1 font-medium",
              isActive("/dashboard/profile") && (isDark ? "text-black" : "text-white"),
              !isActive("/dashboard/profile") && "group-hover:text-white dark:group-hover:text-black"
            )}>Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
