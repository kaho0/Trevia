"use client"

import { X, Calendar, Clock, MapPin, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface DetailsPaneProps {
  itemId: string | null
  onClose: () => void
}

export default function DetailsPane({ itemId, onClose }: DetailsPaneProps) {
  // Mock data based on the itemId
  const getItemDetails = () => {
    switch (itemId) {
      case "trip-overview":
        return {
          title: "Tokyo Trip Overview",
          type: "trip",
          image: "/placeholder.svg?height=200&width=300",
          dates: "27 April - 2 May 2025",
          description:
            "Experience the blend of traditional and modern Japan in Tokyo, one of the world's most exciting cities.",
          highlights: ["5 Days / 5 Nights", "2 Hotels", "6 Activities", "Round-trip Flights"],
        }
      case "flight-details":
        return {
          title: "Flight Details",
          type: "flight",
          airline: "Singapore Airlines",
          flightNumber: "SQ306",
          departure: {
            airport: "Delhi International Airport (DEL)",
            terminal: "Terminal 3",
            time: "10:00 AM, 27 April 2025",
          },
          arrival: {
            airport: "Tokyo Narita Airport (NRT)",
            terminal: "Terminal 1",
            time: "8:30 PM, 27 April 2025",
          },
          duration: "8h 30m",
          class: "Economy",
          status: "Confirmed",
        }
      case "hotel-shinagawa":
        return {
          title: "Shinagawa Prince Hotel",
          type: "hotel",
          image: "/placeholder.svg?height=200&width=300",
          address: "4-10-30 Takanawa, Minato-ku, Tokyo",
          checkIn: "27 April 2025, 3:00 PM",
          checkOut: "30 April 2025, 11:00 AM",
          roomType: "Standard Room, 1 King Bed",
          amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Fitness Center"],
          status: "Confirmed",
          price: "$120 per night",
        }
      case "hotel-mercure":
        return {
          title: "Mercure Tokyo Hotel",
          type: "hotel",
          image: "/placeholder.svg?height=200&width=300",
          address: "2-9-4 Ginza, Chuo-ku, Tokyo",
          checkIn: "30 April 2025, 2:00 PM",
          checkOut: "2 May 2025, 11:00 AM",
          roomType: "Deluxe Room, 2 Queen Beds",
          amenities: ["Free WiFi", "Breakfast Included", "Restaurant", "Bar"],
          status: "Pending Confirmation",
          price: "$150 per night",
        }
      case "activity-senso-ji":
        return {
          title: "Senso-ji Temple & Nakamise Shopping Street Tour",
          type: "activity",
          image: "/placeholder.svg?height=200&width=300",
          date: "27 April 2025",
          time: "9:00 AM - 12:00 PM",
          duration: "3 hours",
          meetingPoint: "Hotel Lobby",
          description:
            "Visit Tokyo's oldest temple and explore the traditional shopping street with a knowledgeable guide.",
          included: ["English-speaking guide", "Temple entrance fees", "Bottled water"],
          price: "$45 per person",
        }
      case "activity-sky-tree":
        return {
          title: "Tokyo Sky Tree",
          type: "activity",
          image: "/placeholder.svg?height=200&width=300",
          date: "27 April 2025",
          time: "1:00 PM - 3:00 PM",
          duration: "2 hours",
          meetingPoint: "Nakamise Street Exit",
          description: "Visit one of the world's tallest towers for breathtaking views of Tokyo.",
          included: ["Skip-the-line tickets", "Observation deck access"],
          price: "$30 per person",
        }
      case "activity-kimono":
        return {
          title: "Kimono Wearing Experience",
          type: "activity",
          image: "/placeholder.svg?height=200&width=300",
          date: "27 April 2025",
          time: "Flexible (before 8:00 PM)",
          duration: "1.5 hours",
          meetingPoint: "Self-transfer to venue",
          description:
            "Experience traditional Japanese culture by wearing an authentic kimono with professional assistance.",
          included: ["Kimono rental", "Professional dressing assistance", "Photo opportunity"],
          price: "$60 per person",
        }
      default:
        return {
          title: "Item Details",
          type: "unknown",
          description: "No details available for this item.",
        }
    }
  }

  const details = getItemDetails()

  return (
    <div className="absolute top-0 right-0 w-full md:w-80 h-full bg-gray-900 text-white rounded-lg shadow-lg z-10 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">{details.title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {details.image && (
          <div className="mb-4">
            <Image
              src={details.image || "/placeholder.svg"}
              alt={details.title}
              width={300}
              height={200}
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
        )}

        {details.type === "trip" && (
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-400" />
              <span>{details.dates}</span>
            </div>
            <p className="text-sm text-gray-300">{details.description}</p>
            <div className="bg-gray-800 p-3 rounded-lg">
              <h4 className="font-medium mb-2">Trip Highlights</h4>
              <ul className="space-y-2">
                {details.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {details.type === "flight" && (
          <div className="space-y-4">
            <div className="bg-blue-900/50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">{details.airline}</span>
                <span className="text-sm font-medium">{details.flightNumber}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-bold text-lg">DEL</div>
                  <div className="text-xs text-gray-400">Delhi</div>
                </div>
                <div className="flex-1 flex flex-col items-center px-4">
                  <div className="h-[1px] w-full bg-gray-500 relative">
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 rotate-90">✈️</div>
                  </div>
                  <div className="text-xs mt-1">{details.duration}</div>
                </div>
                <div>
                  <div className="font-bold text-lg">NRT</div>
                  <div className="text-xs text-gray-400">Tokyo</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-1">Departure</h4>
                <div className="text-xs text-gray-300">{details.departure.airport}</div>
                <div className="text-xs text-gray-300">{details.departure.terminal}</div>
                <div className="text-xs text-gray-300">{details.departure.time}</div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Arrival</h4>
                <div className="text-xs text-gray-300">{details.arrival.airport}</div>
                <div className="text-xs text-gray-300">{details.arrival.terminal}</div>
                <div className="text-xs text-gray-300">{details.arrival.time}</div>
              </div>

              <div className="flex justify-between">
                <div>
                  <h4 className="text-sm font-medium mb-1">Class</h4>
                  <div className="text-xs text-gray-300">{details.class}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Status</h4>
                  <div className="text-xs text-green-400">{details.status}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {details.type === "hotel" && (
          <div className="space-y-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-400" />
              <span className="text-sm">{details.address}</span>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-1">Check-in</h4>
                <div className="text-xs text-gray-300">{details.checkIn}</div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Check-out</h4>
                <div className="text-xs text-gray-300">{details.checkOut}</div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Room Type</h4>
                <div className="text-xs text-gray-300">{details.roomType}</div>
              </div>

              <div className="flex justify-between">
                <div>
                  <h4 className="text-sm font-medium mb-1">Price</h4>
                  <div className="text-xs text-gray-300">{details.price}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Status</h4>
                  <div className={`text-xs ${details.status === "Confirmed" ? "text-green-400" : "text-yellow-400"}`}>
                    {details.status}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                {details.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-xs">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {details.type === "activity" && (
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-400" />
              <span className="text-sm">{details.date}</span>
            </div>

            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-400" />
              <span className="text-sm">
                {details.time} ({details.duration})
              </span>
            </div>

            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-400" />
              <span className="text-sm">{details.meetingPoint}</span>
            </div>

            <p className="text-sm text-gray-300">{details.description}</p>

            <div className="bg-gray-800 p-3 rounded-lg">
              <h4 className="font-medium mb-2">What's Included</h4>
              <ul className="space-y-2">
                {details.included.map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium mb-1">Price</h4>
                <div className="text-sm text-gray-300">{details.price}</div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">View Tickets</Button>
            </div>
          </div>
        )}

        {details.type === "unknown" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Info className="h-12 w-12 text-gray-500 mb-4" />
            <p className="text-gray-400 text-center">{details.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
