import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Hotel {
  id: string
  name: string
  image: string
  roomType: string
  checkIn: string
  checkOut: string
  nights: number
  status: "Confirmed" | "Pending"
}

interface AccommodationSectionProps {
  hotels: Hotel[]
}

export default function AccommodationSection({ hotels }: AccommodationSectionProps) {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Accommodation</h2>
        <Link href="#" className="text-sm text-blue-600 dark:text-blue-400">
          See all
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="bg-gray-100 dark:bg-gray-800 border-0">
            <div className="relative h-32 bg-gray-200 dark:bg-gray-700">
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                {hotel.status === "Confirmed" ? "Confirmed" : "Pending"}
              </div>
              <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">{hotel.name}</h3>
              <div className="text-xs text-muted-foreground mb-1">{hotel.roomType}</div>
              <div className="text-xs text-muted-foreground">{hotel.checkIn}</div>
              <div className="text-xs text-muted-foreground">{hotel.checkOut}</div>
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs">{hotel.nights} Nights</div>
                <div
                  className={`${
                    hotel.status === "Confirmed"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  } text-xs px-2 py-0.5 rounded`}
                >
                  {hotel.status}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
