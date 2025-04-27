"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Star, MapPin, Clock } from "lucide-react"

// Mock data for favorites
const favoriteDestinations = [
  {
    id: 1,
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3",
    saved: "2 weeks ago",
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3",
    saved: "1 month ago",
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3",
    saved: "3 days ago",
  },
]

const favoriteHotels = [
  {
    id: 1,
    name: "Shinagawa Prince Hotel",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
    price: "$120/night",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Kyoto Ryokan Traditional",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3",
    price: "$180/night",
    rating: 4.9,
  },
]

const favoriteActivities = [
  {
    id: 1,
    name: "Mount Fuji Day Trip",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?ixlib=rb-4.0.3",
    duration: "Full day",
    price: "$120",
  },
  {
    id: 2,
    name: "Tokyo Food Tour",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540648639573-8c848de23f0a?ixlib=rb-4.0.3",
    duration: "3 hours",
    price: "$85",
  },
  {
    id: 3,
    name: "Samurai Experience",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3",
    duration: "1.5 hours",
    price: "$95",
  },
]

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<"destinations" | "hotels" | "activities">("destinations")

  return (
    <div className="pb-4">
      <h1 className="text-xl font-bold mb-4">Your Favorites</h1>

      {/* Tabs */}
      <Tabs defaultValue="destinations" className="mb-6" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="destinations">Places</TabsTrigger>
          <TabsTrigger value="hotels">Hotels</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content based on active tab */}
      {activeTab === "destinations" && (
        <div className="grid grid-cols-2 gap-4">
          {favoriteDestinations.map((destination) => (
            <div key={destination.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative h-32">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-white dark:bg-gray-900 text-red-500 p-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium">{destination.name}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{destination.country}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Saved {destination.saved}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "hotels" && (
        <div className="space-y-4">
          {favoriteHotels.map((hotel) => (
            <div key={hotel.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="flex">
                <div className="relative w-24 h-24">
                  <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                </div>
                <div className="p-3 flex-1">
                  <h3 className="font-medium">{hotel.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {hotel.location}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{hotel.price}</span>
                    <div className="flex items-center text-xs">
                      <Star className="h-3 w-3 text-yellow-400 mr-1" />
                      {hotel.rating}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "activities" && (
        <div className="space-y-4">
          {favoriteActivities.map((activity) => (
            <div key={activity.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="flex">
                <div className="relative w-24 h-24">
                  <Image src={activity.image || "/placeholder.svg"} alt={activity.name} fill className="object-cover" />
                </div>
                <div className="p-3 flex-1">
                  <h3 className="font-medium">{activity.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {activity.location}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.duration}
                    </div>
                    <span className="text-sm font-medium">{activity.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
