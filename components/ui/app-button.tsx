"use client"

import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"
import { useTheme } from "next-themes"

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "lime"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
}

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth = false, children, ...props }, ref) => {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          {
            // Variants
            [isDark ? "bg-[#C1FF72] text-black hover:bg-[#B1EF62]" : "bg-blue-600 text-white hover:bg-blue-700"]:
              variant === "primary",
            [isDark
              ? "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700"
              : "bg-gray-200 border border-gray-300 text-black hover:bg-gray-300"]: variant === "secondary",
            [isDark
              ? "border border-gray-700 text-[#C1FF72] hover:bg-gray-800"
              : "border border-gray-300 text-blue-600 hover:bg-gray-100"]: variant === "outline",
            "bg-[#C1FF72] text-black hover:bg-[#B1EF62]": variant === "lime",

            // Sizes
            "text-xs px-3 py-1.5 rounded-full": size === "sm",
            "text-sm px-5 py-2.5 rounded-full": size === "md",
            "text-base px-6 py-3 rounded-full": size === "lg",

            // Width
            "w-full": fullWidth,
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

AppButton.displayName = "AppButton"

export { AppButton }
