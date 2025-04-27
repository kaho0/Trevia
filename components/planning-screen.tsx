"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TravelPlan, TravelCompanion } from "./travel-planner"
import { MapPin, Clock } from "lucide-react"

interface PlanningScreenProps {
  onSubmit: (plan: TravelPlan) => void
}

export default function PlanningScreen({ onSubmit }: PlanningScreenProps) {
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("")
  const [companions, setCompanions] = useState<TravelCompanion[]>([])

  const handleCompanionToggle = (companion: TravelCompanion) => {
    if (companions.includes(companion)) {
      setCompanions(companions.filter((c) => c !== companion))
    } else {
      setCompanions([...companions, companion])
    }
  }

  const handleSubmit = () => {
    onSubmit({
      destination,
      duration,
      companions,
    })
  }

  return (
    <div className="bg-black text-white p-6 rounded-lg w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Plan Your Journey, Your Way!</h1>
        <p className="text-sm text-gray-400">Let's create your personalized travel experience</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block mb-2">Where would you like to go?</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Enter Destination"
              className="pl-10 bg-gray-800 border-gray-700"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">How long will you stay?</label>
          <Select onValueChange={setDuration}>
            <SelectTrigger className="bg-gray-800 border-gray-700">
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
          <label className="block mb-2">Who are you travelling with?</label>
          <div className="grid grid-cols-2 gap-3">
            {(["Solo", "Couple", "Family", "Friends"] as TravelCompanion[]).map((option) => (
              <button
                key={option}
                onClick={() => handleCompanionToggle(option)}
                className={`py-3 px-4 rounded-lg flex items-center justify-center ${
                  companions.includes(option) ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
                }`}
              >
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleSubmit}
          disabled={!destination || !duration || companions.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
