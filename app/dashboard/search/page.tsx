"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Calendar, Users, Filter } from "lucide-react"
import Image from "next/image"

// Mock data for search results
const popularDestinations = [
  {
    id: 1,
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Osaka",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?ixlib=rb-4.0.3",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3",
    rating: 4.7,
  },
  {
    id: 6,
    name: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3",
    rating: 4.6,
  },
]

const trendingActivities = [
  {
    id: 1,
    name: "Mount Fuji Day Trip",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?ixlib=rb-4.0.3",
    price: "$120",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Tokyo Food Tour",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540648639573-8c848de23f0a?ixlib=rb-4.0.3",
    price: "$85",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Samurai Experience",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3",
    price: "$95",
    rating: 4.7,
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"destinations" | "activities" | "hotels">("destinations")

  return (
    <div className="pb-4">
      <h1 className="text-xl font-bold mb-4">Discover</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search destinations, activities, hotels..."
          className="pl-10 pr-16 py-6 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button size="sm" className="absolute right-2 top-2">
          <Filter className="h-4 w-4 mr-1" />
          Filters
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <Button variant="outline" size="sm" className="flex items-center whitespace-nowrap">
          <MapPin className="h-4 w-4 mr-1" />
          Nearby
        </Button>
        <Button variant="outline" size="sm" className="flex items-center whitespace-nowrap">
          <Calendar className="h-4 w-4 mr-1" />
          Dates
        </Button>
        <Button variant="outline" size="sm" className="flex items-center whitespace-nowrap">
          <Users className="h-4 w-4 mr-1" />
          Group Size
        </Button>
        <Button variant="outline" size="sm" className="flex items-center whitespace-nowrap">
          Budget
        </Button>
        <Button variant="outline" size="sm" className="flex items-center whitespace-nowrap">
          Rating
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="destinations" className="mb-6" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="hotels">Hotels</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content based on active tab */}
      {activeTab === "destinations" && (
        <>
          <h2 className="text-lg font-medium mb-4">Popular Destinations</h2>
          <div className="grid grid-cols-2 gap-4">
            {popularDestinations.map((destination) => (
              <div key={destination.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div className="relative h-32">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-yellow-400 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {destination.rating}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium">{destination.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{destination.country}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "activities" && (
        <>
          <h2 className="text-lg font-medium mb-4">Trending Activities</h2>
          <div className="space-y-4">
            {trendingActivities.map((activity) => (
              <div key={activity.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div className="flex">
                  <div className="relative w-24 h-24">
                    <Image
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <h3 className="font-medium">{activity.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{activity.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{activity.price}</span>
                      <div className="flex items-center text-xs">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-yellow-400 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {activity.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "hotels" && (
        <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">Coming soon!</p>
        </div>
      )}
    </div>
  )
}
