"use client"

import { useState } from "react"
import PlanningScreen from "./planning-screen"
import ItineraryScreen from "./itinerary-screen"
import DetailsPane from "./details-pane"

export type TravelCompanion = "Solo" | "Couple" | "Family" | "Friends"

export interface TravelPlan {
  destination: string
  duration: string
  companions: TravelCompanion[]
}

export default function TravelPlanner() {
  const [currentScreen, setCurrentScreen] = useState<"planning" | "itinerary">("planning")
  const [travelPlan, setTravelPlan] = useState<TravelPlan>({
    destination: "",
    duration: "",
    companions: [],
  })
  const [showDetailsPane, setShowDetailsPane] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const handlePlanSubmit = (plan: TravelPlan) => {
    setTravelPlan(plan)
    setCurrentScreen("itinerary")
  }

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId)
    setShowDetailsPane(true)
  }

  const handleCloseDetailsPane = () => {
    setShowDetailsPane(false)
    setSelectedItem(null)
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {currentScreen === "planning" ? (
        <PlanningScreen onSubmit={handlePlanSubmit} />
      ) : (
        <div className="relative flex">
          <ItineraryScreen travelPlan={travelPlan} onItemClick={handleItemClick} />
          {showDetailsPane && <DetailsPane itemId={selectedItem} onClose={handleCloseDetailsPane} />}
        </div>
      )}
    </div>
  )
}
