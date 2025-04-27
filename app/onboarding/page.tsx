"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Users } from "lucide-react"
import { useTheme } from "next-themes"

export default function OnboardingPage() {
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("")
  const [companions, setCompanions] = useState<string[]>([])
  const router = useRouter()
  const { theme } = useTheme()

  const handleCompanionToggle = (companion: string) => {
    if (companions.includes(companion)) {
      setCompanions(companions.filter((c) => c !== companion))
    } else {
      setCompanions([...companions, companion])
    }
  }

  const handleContinue = () => {
    router.push("/dashboard")
  }

  const isDark = theme === "dark"

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 flex flex-col">
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Plan Your Journey, Your Way!</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Let's create your personalised travel experience</p>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block mb-3 font-medium">Where would you like to go?</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Enter Destination"
                className="pl-10 h-12 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-3 font-medium">How long will you stay?</label>
            <Select onValueChange={setDuration}>
              <SelectTrigger className="h-12 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-gray-400" />
                  <SelectValue placeholder="Select Duration" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekend">Weekend Getaway (2-3 days)</SelectItem>
                <SelectItem value="week">One Week</SelectItem>
                <SelectItem value="twoweeks">Two Weeks</SelectItem>
                <SelectItem value="month">One Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-3 font-medium">Who are you traveling with?</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Solo", icon: <Users className="mr-2 h-4 w-4" /> },
                { label: "Couple", icon: <Users className="mr-2 h-4 w-4" /> },
                { label: "Family", icon: <Users className="mr-2 h-4 w-4" /> },
                { label: "Friends", icon: <Users className="mr-2 h-4 w-4" /> },
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleCompanionToggle(option.label)}
                  className={`py-3 px-4 rounded-lg flex items-center justify-center ${
                    companions.includes(option.label)
                      ? "bg-blue-600 text-white"
                      : isDark
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button
        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white mt-6"
        onClick={handleContinue}
        disabled={!destination || !duration || companions.length === 0}
      >
        Continue
      </Button>
    </div>
  )
}
