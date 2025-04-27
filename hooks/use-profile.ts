"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "@/components/supabase-provider"
import type { User } from "@supabase/supabase-js"

export type Profile = {
  id: string
  updated_at: string | null
  username: string | null
  full_name: string | null
  avatar_url: string | null
  website: string | null
  email: string | null
  created_at: string | null
}

export function useProfile() {
  const { supabase } = useSupabase()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Function to refresh profile data
  const refreshProfile = () => setRefreshTrigger((prev) => prev + 1)

  useEffect(() => {
    let isMounted = true

    const fetchUserAndProfile = async () => {
      try {
        if (!isMounted) return

        setLoading(true)
        setError(null)

        // Get the current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError) {
          console.log("User error:", userError.message)
          if (isMounted) {
            setLoading(false)
            setUser(null)
            setProfile(null)
          }
          return
        }

        if (!user) {
          if (isMounted) {
            setUser(null)
            setProfile(null)
            setLoading(false)
          }
          return
        }

        if (isMounted) {
          setUser(user)
        }

        // Get the user's profile from the profiles table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError && profileError.code !== "PGRST116") {
          // PGRST116 is "No rows found" error, which is expected for new users
          console.log("Profile error:", profileError.message)
        }

        // Merge user data with profile data
        const mergedProfile: Profile = {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          updated_at: profileData?.updated_at || null,
          username: profileData?.username || user.email?.split("@")[0] || null,
          full_name: profileData?.full_name || user.user_metadata?.full_name || null,
          avatar_url: profileData?.avatar_url || user.user_metadata?.avatar_url || null,
          website: profileData?.website || null,
        }

        if (isMounted) {
          setProfile(mergedProfile)
          setLoading(false)
        }
      } catch (err) {
        console.error("Error in useProfile:", err)
        if (isMounted) {
          setLoading(false)
          // Don't set error state for auth session missing, as it's expected on public pages
          if (err instanceof Error && !err.message.includes("Auth session missing")) {
            setError(err)
          }
        }
      }
    }

    fetchUserAndProfile()

    return () => {
      isMounted = false
    }
  }, [supabase, refreshTrigger])

  // Function to update profile
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error("No user logged in") }

    try {
      setLoading(true)

      // Update the profiles table
      const { error: updateError } = await supabase.from("profiles").upsert({
        id: user.id,
        updated_at: new Date().toISOString(),
        ...updates,
      })

      if (updateError) throw updateError

      // If updating full_name, also update user metadata
      if (updates.full_name) {
        const { error: metadataError } = await supabase.auth.updateUser({
          data: { full_name: updates.full_name },
        })

        if (metadataError) throw metadataError
      }

      // Refresh the profile data
      refreshProfile()

      return { success: true }
    } catch (err) {
      console.error("Error updating profile:", err)
      return { error: err instanceof Error ? err : new Error(String(err)) }
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    profile,
    loading,
    error,
    refreshProfile,
    updateProfile,
    // Helper getters
    isLoggedIn: !!user,
    displayName: profile?.full_name || profile?.username || user?.email?.split("@")[0] || "User",
    avatarUrl: profile?.avatar_url,
    initials: (profile?.full_name || profile?.username || user?.email?.split("@")[0] || "U").charAt(0).toUpperCase(),
  }
}
