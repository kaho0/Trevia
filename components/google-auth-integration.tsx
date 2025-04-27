"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChromeIcon as Google } from "lucide-react"

interface GoogleAuthProps {
  onSuccess?: (userData: any) => void
  onError?: (error: Error) => void
}

export default function GoogleAuthIntegration({ onSuccess, onError }: GoogleAuthProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  // Mock Google authentication flow
  const handleGoogleAuth = async () => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock user data
      const mockUserData = {
        id: "google-user-123",
        name: "Chhavi",
        email: "chhavi@example.com",
        picture: "https://via.placeholder.com/150",
        accessToken: "mock-access-token-xyz",
      }

      setUserData(mockUserData)
      setIsAuthenticated(true)

      if (onSuccess) {
        onSuccess(mockUserData)
      }
    } catch (error) {
      console.error("Google authentication failed:", error)
      if (onError && error instanceof Error) {
        onError(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
    setUserData(null)
  }

  return (
    <div className="w-full">
      {!isAuthenticated ? (
        <Button
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100"
        >
          <Google className="h-4 w-4" />
          {isLoading ? "Connecting..." : "Continue with Google"}
        </Button>
      ) : (
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
              {userData?.name?.charAt(0) || "U"}
            </div>
            <div>
              <div className="font-medium">{userData?.name}</div>
              <div className="text-xs text-gray-400">{userData?.email}</div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-green-400">Connected</div>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="text-xs">
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
