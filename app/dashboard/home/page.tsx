"use client"
import { Star, Calendar, Loader2, Bell, UsersIcon, Clock, ClipboardListIcon } from "lucide-react"
import { useProfile } from "@/hooks/use-profile"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useTheme } from "next-themes"

export default function HomePage() {
  const { profile, loading, isLoggedIn, displayName, initials } = useProfile()
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/")
    }
  }, [loading, isLoggedIn, router])

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

  return (
    <div className={isDark ? "text-white" : "text-black"}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold">Hello {displayName}!</h1>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>Ready for the trip?</p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {profile?.avatar_url ? (
            <div className="w-10 h-10 relative rounded-full overflow-hidden">
              <Image src={profile.avatar_url || "/placeholder.svg"} alt={displayName} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
              {initials}
            </div>
          )}
        </div>
      </div>

      {/* Trip Card */}
      <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Your Upcoming Trip</h2>
      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3"
          alt="Tokyo Skyline with Tokyo Tower"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-purple-500/20 to-black/50"></div>
        
        {/* Top-left city and date */}
        <div className="absolute top-6 left-6 z-10 flex flex-col items-start">
          <h2 className="text-5xl font-extrabold text-white tracking-wide leading-none drop-shadow-md">TOKYO</h2>
          <p className="text-base text-white/90 mt-2 font-medium drop-shadow">27.01.2025 - 02.02.2025</p>
        </div>
        
        {/* Top-right arrow icon */}
        <div className="absolute top-6 right-6 z-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>
        
        {/* Bottom stats row */}
        <div className="absolute bottom-6 left-0 w-full flex justify-evenly items-center px-6 z-10 gap-4">
          {/* Duration */}
          <div className="flex items-center">
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-2 text-[#C1FF72] bg-black/40 rounded-full" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">8 Days</span>
                <span className="text-xs text-white">Duration</span>
              </div>
            </div>
          </div>
          
          {/* Group Size */}
          <div className="flex items-center">
            <div className="flex items-center  rounded-full px-3 py-2">
              <UsersIcon className="w-6 h-6 mr-2 text-[#C1FF72] bg-black/40 rounded-full" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">4 (2M,2F)</span>
                <span className="text-xs text-white">Group Size</span>
              </div>
            </div>
          </div>
          
          {/* Activities */}
          <div className="flex items-center">
            <div className="flex items-center rounded-full px-3 py-2">
              <ClipboardListIcon className="w-6 h-6 mr-2 text-[#C1FF72] bg-black/40 rounded-full" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">14</span>
                <span className="text-xs text-white">Activities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Flight Details */}
      <div className="bg-blue-600 rounded-xl p-4 relative overflow-hidden min-h-[100px]">
  {/* See all button */}
  <button className="absolute top-2 right-3 text-xs text-lime-300 font-medium z-20">See all</button>
  {/* Plane image */}
  <div className="absolute right-0 bottom-0 w-32 h-16 opacity-80 pointer-events-none select-none z-10">
    <Image
      src="/plane.png"
      alt="Plane"
      fill
      className="object-contain"
      priority
      draggable={false}
    />
  </div>
  {/* Date/time */}
  <div className="text-xs text-gray-200 mb-2 z-20 relative">26.01.2025, 10:50 am</div>
  {/* DEL → NRT */}
  <div className="flex items-center z-20 relative">
    <div>
      <div className="font-bold text-lg text-white">DEL</div>
      <div className="text-xs text-gray-200">Delhi, India</div>
    </div>
    <div className="mx-2 text-white text-xl">→</div>
    <div>
      <div className="font-bold text-lg text-white">NRT</div>
      <div className="text-xs text-gray-200">Narita, Tokyo</div>
    </div>
  </div>
</div>
      {/* Accommodation */}
      <div className="mb-8 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Accommodation</h2>
          <button className={`text-sm ${isDark ? "text-[#C1FF72]" : "text-blue-600"} font-medium`}>See all</button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2">
          <div className={`min-w-[220px] ${isDark ? "bg-gray-800" : "bg-white shadow-md"} rounded-xl overflow-hidden`}>
            <div className="h-28 bg-gray-200 relative">
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                Confirmed
              </div>
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Shinagawa Prince Hotel"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-base">Shinagawa Hotel</h4>
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} mt-2`}>
                Check in: 28.01.2025, 11:15 am
              </div>
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>
                Check out: 30.01.2025, 11:0 am
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="text-xs font-medium">2 Nights</div>
                <div
                  className={`${isDark ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"} text-xs px-3 py-1 rounded-full font-medium`}
                >
                  Confirmed
                </div>
              </div>
            </div>
          </div>
          <div className={`min-w-[220px] ${isDark ? "bg-gray-800" : "bg-white shadow-md"} rounded-xl overflow-hidden`}>
            <div className="h-28 bg-gray-200 relative">
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                Confirmed
              </div>
              <Image
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Mercure Tokyo Hotel"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-base">Mercure Tokyo Hotel</h4>
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} mt-2`}>
                Check in: 30.01.2025, 6:00 pm
              </div>
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>
                Check out: 01.02.2025, 11:0 am
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="text-xs font-medium">2 Nights</div>
                <div
                  className={`${isDark ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-600"} text-xs px-3 py-1 rounded-full font-medium`}
                >
                  Pending
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities - Updated to match the design exactly */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Activities</h2>
          <button className={`text-sm ${isDark ? "text-[#C1FF72]" : "text-blue-600"} font-medium`}>See all</button>
        </div>

        {/* Day Plan and Activities buttons - Updated to match design */}
        <div className="flex gap-3 mb-6">
          <button
            className={`${isDark ? "bg-[#C1FF72] text-black" : "bg-blue-600 text-white"} font-semibold text-sm px-6 py-2.5 rounded-full`}
          >
            Day Plan
          </button>
          <button
            className={`bg-transparent border ${isDark ? "border-gray-700 text-white" : "border-gray-300 text-gray-700"} font-medium text-sm px-6 py-2.5 rounded-full`}
          >
            14 Activities
          </button>
        </div>

        {/* Calendar days - Updated to match design exactly */}
        <div className={`${isDark ? "bg-[#1E293B]" : "bg-white border border-gray-200"} rounded-xl p-4 mb-6`}>
          <div className="grid grid-cols-7 gap-1">
            <div className="flex flex-col">
              <div className={`text-xs ${isDark ? "text-[#C1FF72]" : "text-blue-600"} font-bold mb-1 text-center`}>
                JAN
              </div>
              <div
                className={`${isDark ? "bg-[#C1FF72] text-black" : "bg-blue-600 text-white"} rounded-lg overflow-hidden`}
              >
                <div className="text-xs font-medium text-center pt-1">MON</div>
                <div className="text-lg font-bold text-center pb-1">27</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1 text-center invisible">TUE</div>
              <div
                className={`bg-transparent ${isDark ? "text-gray-400" : "text-gray-600"} rounded-lg overflow-hidden`}
              >
                <div className="text-xs font-medium text-center pt-1">TUE</div>
                <div className="text-lg font-medium text-center pb-1">28</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1 text-center invisible">WED</div>
              <div
                className={`bg-transparent ${isDark ? "text-gray-400" : "text-gray-600"} rounded-lg overflow-hidden`}
              >
                <div className="text-xs font-medium text-center pt-1">WED</div>
                <div className="text-lg font-medium text-center pb-1">29</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1 text-center invisible">THU</div>
              <div
                className={`bg-transparent ${isDark ? "text-gray-400" : "text-gray-600"} rounded-lg overflow-hidden`}
              >
                <div className="text-xs font-medium text-center pt-1">THU</div>
                <div className="text-lg font-medium text-center pb-1">30</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1 text-center invisible">FRI</div>
              <div
                className={`bg-transparent ${isDark ? "text-gray-400" : "text-gray-600"} rounded-lg overflow-hidden`}
              >
                <div className="text-xs font-medium text-center pt-1">FRI</div>
                <div className="text-lg font-medium text-center pb-1">31</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1 text-center">FEB</div>
              <div
                className={`bg-transparent ${isDark ? "text-gray-400" : "text-gray-600"} rounded-lg overflow-hidden`}
              >
                <div className="text-xs font-medium text-center pt-1">SAT</div>
                <div className="text-lg font-medium text-center pb-1">1</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1 text-center invisible">SUN</div>
              <div
                className={`bg-transparent ${isDark ? "text-gray-400" : "text-gray-600"} rounded-lg overflow-hidden`}
              >
                <div className="text-xs font-medium text-center pt-1">SUN</div>
                <div className="text-lg font-medium text-center pb-1">2</div>
              </div>
            </div>
          </div>
        </div>

        {/* Day indicator - Updated to match design */}
        <div className="flex justify-between items-center mb-5">
          <div
            className={`${isDark ? "bg-[#C1FF72] text-black" : "bg-blue-600 text-white"} font-bold px-4 py-2 rounded-lg text-sm`}
          >
            Day 1 27.01.2025
          </div>
          <div className={`${isDark ? "text-[#C1FF72]" : "text-blue-600"} text-sm flex items-center font-medium`}>
            <Bell className="h-4 w-4 mr-2" /> 3 Activities
          </div>
        </div>

        {/* Activity cards */}
        <div className={`space-y-4 ${isDark ? "bg-[#1E293B]" : "bg-white border border-gray-200"} rounded-xl p-5`}>
          {/* Activity 1 */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex items-stretch h-32 dark:bg-[#0F172A] dark:border-none">
            <div className="relative w-32 h-full rounded-l-xl overflow-hidden flex-shrink-0">
              <Image
                src="/r.jpg"
                alt="Senso-ji Temple"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 30vw, 20vw"
                priority
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center">
              <h4 className="font-semibold text-base sm:text-base text-xs">Shopping Street Senso-ji</h4>
              <div className="text-sm sm:text-sm text-xs mt-3"><span className="font-semibold">Timing:</span> 9:15 am Morning</div>
              <div className="text-sm sm:text-sm text-xs mt-1"><span className="font-semibold">Duration:</span> 3 hours</div>
              <div className="text-sm sm:text-sm text-xs mt-1"><span className="font-semibold">Pick up:</span> From Hotel</div>
            </div>
          </div>

          {/* Activity 2 */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex items-stretch h-32 dark:bg-[#0F172A] dark:border-none">
            <div className="relative w-32 h-full rounded-l-xl overflow-hidden flex-shrink-0">
              <Image
                src="/t.jpg"
                alt="Tokyo Sky Tree"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 30vw, 20vw"
                priority
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center">
              <h4 className="font-semibold text-base sm:text-base text-xs">Tokyo Sky Tree</h4>
              <div className="text-sm sm:text-sm text-xs mt-3"><span className="font-semibold">Timing:</span> 1:00 pm Afternoon</div>
              <div className="text-sm sm:text-sm text-xs mt-1"><span className="font-semibold">Duration:</span> 3 hours</div>
              <div className="text-sm sm:text-sm text-xs mt-1"><span className="font-semibold">Pick up:</span> From Nakamise Street</div>
            </div>
          </div>

          {/* Activity 3 */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex items-stretch h-32 dark:bg-[#0F172A] dark:border-none">
            <div className="relative w-32 h-full rounded-l-xl overflow-hidden flex-shrink-0">
              <Image
                src="/k.jpg"
                alt="Kimono Wearing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 30vw, 20vw"
                priority
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center">
              <h4 className="font-semibold text-base sm:text-base text-xs">Kimono Wearing</h4>
              <div className="text-sm sm:text-sm text-xs mt-3"><span className="font-semibold">Timing:</span> Anytime before 8:00pm</div>
              <div className="text-sm sm:text-sm text-xs mt-1"><span className="font-semibold">Duration:</span> 1-2 hours</div>
              <div className="text-sm sm:text-sm text-xs mt-1"><span className="font-semibold">Pick up:</span> From Hotel</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
