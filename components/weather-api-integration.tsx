"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, Wind, Loader2 } from "lucide-react"

interface WeatherApiProps {
  city: string
  onWeatherData?: (data: any) => void
}

export default function WeatherApiIntegration({ city, onWeatherData }: WeatherApiProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [weatherData, setWeatherData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock weather data based on city
        const mockWeatherData = {
          city: city || "Tokyo",
          temperature: 22,
          condition: "Partly Cloudy",
          humidity: 65,
          windSpeed: 12,
          forecast: [
            { day: "Mon", temp: 22, condition: "Partly Cloudy" },
            { day: "Tue", temp: 24, condition: "Sunny" },
            { day: "Wed", temp: 21, condition: "Rain" },
            { day: "Thu", temp: 20, condition: "Cloudy" },
            { day: "Fri", temp: 23, condition: "Sunny" },
          ],
        }

        setWeatherData(mockWeatherData)

        if (onWeatherData) {
          onWeatherData(mockWeatherData)
        }
      } catch (error) {
        console.error("Failed to fetch weather data:", error)
        setError("Unable to fetch weather data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    if (city) {
      fetchWeatherData()
    }
  }, [city, onWeatherData])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-5 w-5 text-yellow-400" />
      case "rain":
        return <CloudRain className="h-5 w-5 text-blue-400" />
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-400" />
      case "partly cloudy":
        return (
          <div className="relative">
            <Sun className="h-5 w-5 text-yellow-400" />
            <Cloud className="h-4 w-4 text-gray-400 absolute -top-1 -right-1" />
          </div>
        )
      default:
        return <Cloud className="h-5 w-5 text-gray-400" />
    }
  }

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-center h-32">
        <Loader2 className="h-6 w-6 text-blue-400 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 text-center text-red-400 h-32 flex items-center justify-center">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium">{weatherData.city} Weather</h3>
          <p className="text-sm text-gray-400">Current Conditions</p>
        </div>
        <div className="text-3xl font-bold">{weatherData.temperature}°C</div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {getWeatherIcon(weatherData.condition)}
          <span className="ml-2 text-sm">{weatherData.condition}</span>
        </div>
        <div className="flex items-center">
          <Wind className="h-4 w-4 mr-1 text-gray-400" />
          <span className="text-sm">{weatherData.windSpeed} km/h</span>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-3">
        <h4 className="text-sm font-medium mb-2">5-Day Forecast</h4>
        <div className="flex justify-between">
          {weatherData.forecast.map((day: any, index: number) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xs text-gray-400">{day.day}</span>
              <div className="my-1">{getWeatherIcon(day.condition)}</div>
              <span className="text-xs">{day.temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
