"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import { useProfile } from "@/hooks/use-profile"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Settings, CreditCard, Bell, HelpCircle, LogOut, Camera, Loader2 } from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  const { supabase } = useSupabase()
  const { profile, loading, error, updateProfile, displayName, initials, avatarUrl, isLoggedIn } = useProfile()
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [website, setWebsite] = useState("")
  const [updating, setUpdating] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/")
    }
  }, [loading, isLoggedIn, router])

  // Initialize form values when profile data is loaded
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "")
      setUsername(profile.username || "")
      setWebsite(profile.website || "")
    }
  }, [profile])

  const handleUpdateProfile = async () => {
    setUpdating(true)
    try {
      const { error } = await updateProfile({
        full_name: fullName,
        username,
        website,
      })

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!isLoggedIn) {
    return null
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
        <p>Error loading profile: {error.message}</p>
        <Button variant="outline" className="mt-2" onClick={() => router.refresh()}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="pb-4">
      <div className="flex items-center mb-6">
        {avatarUrl ? (
          <div className="relative w-16 h-16 mr-4">
            <Image src={avatarUrl || "/placeholder.svg"} alt={displayName} fill className="rounded-full object-cover" />
            <button className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1">
              <Camera className="h-4 w-4 text-white" />
            </button>
          </div>
        ) : (
          <div className="relative">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
              {initials}
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1">
              <Camera className="h-4 w-4 text-white" />
            </button>
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold">{displayName}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{profile?.email}</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={profile?.email || ""} disabled className="bg-gray-100 dark:bg-gray-800" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Your website"
              />
            </div>

            <Button onClick={handleUpdateProfile} disabled={updating} className="w-full">
              {updating ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center">
            <Settings className="h-5 w-5 mr-3 text-gray-500" />
            <span>App Settings</span>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
            <span>Payment Methods</span>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center">
            <Bell className="h-5 w-5 mr-3 text-gray-500" />
            <span>Notifications</span>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-3 text-gray-500" />
            <span>Help & Support</span>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <Button variant="destructive" className="w-full flex items-center justify-center" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
