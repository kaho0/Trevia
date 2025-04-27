import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"

interface Activity {
  id: string
  name: string
  image: string
  timing: string
  duration: string
  pickUp: string
}

interface ActivitiesSectionProps {
  activities: Activity[]
  totalActivities: number
}

export default function ActivitiesSection({ activities, totalActivities }: ActivitiesSectionProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Activities</h2>
        <Link href="#" className="text-sm text-blue-600 dark:text-blue-400">
          See all
        </Link>
      </div>

      <Tabs defaultValue="day-plan" className="mb-4">
        <TabsList>
          <TabsTrigger value="day-plan" className="text-xs">
            Day Plan
          </TabsTrigger>
          <TabsTrigger value="all-activities" className="text-xs">
            {totalActivities} Activities
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-7 gap-1 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day, i) => (
          <div key={day} className="text-center">
            <div className="text-xs text-muted-foreground">{day}</div>
            <div className={`text-xs py-1 rounded ${i === 0 ? "bg-lime-500 dark:bg-lime-600 text-white" : ""}`}>
              {27 + i}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-xs mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
        <div className="bg-gray-200 dark:bg-gray-700 text-foreground px-2 py-1 rounded">Day 1 - 27.01.2025</div>
        <div className="text-blue-600 dark:text-blue-400">+ {activities.length} Activities</div>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="bg-gray-100 dark:bg-gray-800 border-0">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="relative w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                  <Image src={activity.image || "/placeholder.svg"} alt={activity.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{activity.name}</h4>
                  <div className="text-xs text-muted-foreground mt-1">Timing: {activity.timing}</div>
                  <div className="text-xs text-muted-foreground">Duration: {activity.duration}</div>
                  <div className="text-xs text-muted-foreground">Pick up: {activity.pickUp}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
