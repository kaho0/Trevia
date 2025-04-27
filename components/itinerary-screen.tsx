"use client"

import { useState } from "react"
import type { TravelPlan } from "./travel-planner"
import { Home, Search, Plus, Heart, User, Star, Calendar } from "lucide-react"
import Image from "next/image"

interface ItineraryScreenProps {
  travelPlan: TravelPlan
  onItemClick: (itemId: string) => void
}

export default function ItineraryScreen({ travelPlan, onItemClick }: ItineraryScreenProps) {
  const [activeTab, setActiveTab] = useState<"home" | "search" | "add" | "favorites" | "profile">("home")

  // Mock data based on the design
  const destination = travelPlan.destination || "Tokyo"

  return (
    <div className="bg-black text-white w-full h-[700px] overflow-y-auto rounded-lg">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div>
          <h2 className="font-bold">Hello Chhavi!</h2>
          <p className="text-sm text-gray-400">Ready for the trip?</p>
        </div>
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">C</div>
      </div>

      {/* Trip Card */}
      <div className="px-4">
        <h3 className="mb-2">Your Upcoming Trip</h3>
        <div
          className="relative w-full h-40 rounded-lg overflow-hidden mb-4"
          onClick={() => onItemClick("trip-overview")}
        >
          <Image
            src="/placeholder.svg?height=160&width=400"
            alt="Tokyo"
            width={400}
            height={160}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h2 className="text-3xl font-bold text-white">TOKYO</h2>
            <p className="text-sm text-white/80">27 APRIL - 2 MAY 2025</p>
          </div>
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <div className="bg-black/50 rounded-full px-2 py-1 flex items-center text-xs">
              <Star className="h-3 w-3 text-yellow-400 mr-1" />
              <span>5 Days</span>
            </div>
            <div className="bg-black/50 rounded-full px-2 py-1 flex items-center text-xs">
              <Calendar className="h-3 w-3 text-yellow-400 mr-1" />
              <span>5 Nights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Details */}
      <div className="px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3>Flight Details</h3>
          <button className="text-xs text-blue-400">See all</button>
        </div>
        <div className="bg-blue-900 rounded-lg p-3" onClick={() => onItemClick("flight-details")}>
          <div className="text-xs mb-1">Flight: SQ306, 10:00 am</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold">DEL</div>
              <div className="text-xs text-gray-400">Delhi, India</div>
            </div>
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="h-[1px] flex-1 bg-gray-500 relative">
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 rotate-90">✈️</div>
              </div>
            </div>
            <div>
              <div className="font-bold">NRT</div>
              <div className="text-xs text-gray-400">Narita, Tokyo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Accommodation */}
      <div className="px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3>Accommodation</h3>
          <button className="text-xs text-blue-400">See all</button>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          <div
            className="min-w-[160px] bg-gray-800 rounded-lg overflow-hidden"
            onClick={() => onItemClick("hotel-shinagawa")}
          >
            <div className="h-20 bg-gray-700 relative">
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">Confirmed</div>
            </div>
            <div className="p-2">
              <h4 className="font-medium text-sm">Shinagawa Prince Hotel</h4>
              <div className="text-xs text-gray-400 mb-1">Standard Room, 1 King Bed</div>
              <div className="text-xs text-gray-400">Check out: 30.04.2025, 11:0 am</div>
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs">3 Nights</div>
                <div className="bg-green-900/50 text-green-400 text-xs px-2 py-0.5 rounded">Confirmed</div>
              </div>
            </div>
          </div>
          <div
            className="min-w-[160px] bg-gray-800 rounded-lg overflow-hidden"
            onClick={() => onItemClick("hotel-mercure")}
          >
            <div className="h-20 bg-gray-700 relative">
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">Confirmed</div>
            </div>
            <div className="p-2">
              <h4 className="font-medium text-sm">Mercure Tokyo Hotel</h4>
              <div className="text-xs text-gray-400 mb-1">Deluxe Room, 2 Queen Beds</div>
              <div className="text-xs text-gray-400">Check out: 30.04.2025, 11:0 am</div>
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs">2 Nights</div>
                <div className="bg-red-900/50 text-red-400 text-xs px-2 py-0.5 rounded">Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3>Activities</h3>
          <button className="text-xs text-blue-400">See all</button>
        </div>
        <div className="bg-gray-900 rounded-lg p-3 mb-3">
          <div className="flex justify-between mb-2">
            <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">Day Plan</button>
            <button className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full">All Activities</button>
          </div>
          <div className="flex justify-between mb-2">
            <div className="grid grid-cols-7 gap-1 w-full">
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day, i) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-gray-400">{day}</div>
                  <div className={`text-xs py-1 rounded ${i === 0 ? "bg-blue-600" : ""}`}>{27 + i}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center text-xs">
            <div className="bg-gray-800 text-white px-2 py-1 rounded">Day 1 - 27th April</div>
            <div className="text-blue-400">+ 3 Activities</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 mb-3" onClick={() => onItemClick("activity-senso-ji")}>
          <div className="flex gap-3">
            <div className="w-16 h-16 bg-gray-700 rounded"></div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Senso-ji Temple & Nakamise Shopping Street Tour</h4>
              <div className="text-xs text-gray-400 mt-1">Timing: 9:00 am to 12:00 pm</div>
              <div className="text-xs text-gray-400">Duration: 3 hours</div>
              <div className="text-xs text-gray-400">Pick-up: From Hotel</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 mb-3" onClick={() => onItemClick("activity-sky-tree")}>
          <div className="flex gap-3">
            <div className="w-16 h-16 bg-gray-700 rounded"></div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Tokyo Sky Tree</h4>
              <div className="text-xs text-gray-400 mt-1">Timing: 1:00 pm to 3:00 pm</div>
              <div className="text-xs text-gray-400">Duration: 2 hours</div>
              <div className="text-xs text-gray-400">Pick-up: From Nakamise Street</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 mb-3" onClick={() => onItemClick("activity-kimono")}>
          <div className="flex gap-3">
            <div className="w-16 h-16 bg-gray-700 rounded"></div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Kimono Wearing</h4>
              <div className="text-xs text-gray-400 mt-1">Timing: Anytime before 8:00 pm</div>
              <div className="text-xs text-gray-400">Duration: 1.5 hours</div>
              <div className="text-xs text-gray-400">Pick-up: Self</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 flex justify-between items-center p-3 max-w-md mx-auto">
        <button
          className={`flex flex-col items-center ${activeTab === "home" ? "text-white" : "text-gray-500"}`}
          onClick={() => setActiveTab("home")}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          className={`flex flex-col items-center ${activeTab === "search" ? "text-white" : "text-gray-500"}`}
          onClick={() => setActiveTab("search")}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Search</span>
        </button>
        <button className="flex flex-col items-center" onClick={() => setActiveTab("add")}>
          <div className="bg-blue-600 rounded-full p-2">
            <Plus className="h-5 w-5 text-white" />
          </div>
        </button>
        <button
          className={`flex flex-col items-center ${activeTab === "favorites" ? "text-white" : "text-gray-500"}`}
          onClick={() => setActiveTab("favorites")}
        >
          <Heart className="h-5 w-5" />
          <span className="text-xs mt-1">Favorites</span>
        </button>
        <button
          className={`flex flex-col items-center ${activeTab === "profile" ? "text-white" : "text-gray-500"}`}
          onClick={() => setActiveTab("profile")}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  )
}
