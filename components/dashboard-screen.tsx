"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertTriangle,
  CheckCircle2,
  Cloud,
  Droplets,
  Eye,
  Gauge,
  Leaf,
  LogOut,
  MapPin,
  Menu,
  Settings,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react"

interface SensorData {
  tempAir: number
  humidity: number
  windSpeed: number
  rainfall: number
  lightIntensity: number
  soilMoisture: number
  waterAvail: number
  waterTemp: number
  waterPh: number
  connected: boolean
  location: string
}

interface DashboardScreenProps {
  onLogout: () => void
}

const ANIMAL_IMAGES: Record<string, string> = {
  poultry: "/poultry-chicken-farm-birds.jpg",
  cattle: "/cattle-cow-livestock-farm.jpg",
  pigs: "/pigs-piglets-farm.jpg",
  sheep: "/sheep-wool-livestock-farm.jpg",
}

const SENSOR_COLORS: Record<string, { bg: string; icon: string; border: string }> = {
  temperature: {
    bg: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30",
    icon: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-800",
  },
  humidity: {
    bg: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    icon: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  wind: {
    bg: "from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30",
    icon: "text-slate-600 dark:text-slate-400",
    border: "border-slate-200 dark:border-slate-800",
  },
  sun: {
    bg: "from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30",
    icon: "text-amber-600 dark:text-amber-400",
    border: "border-yellow-200 dark:border-yellow-800",
  },
  soil: {
    bg: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
    icon: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
  },
  water: {
    bg: "from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30",
    icon: "text-teal-600 dark:text-teal-400",
    border: "border-teal-200 dark:border-teal-800",
  },
}

export default function DashboardScreen({ onLogout }: DashboardScreenProps) {
  const [animalType, setAnimalType] = useState("poultry")
  const [sensorData, setSensorData] = useState<SensorData>({
    tempAir: 24.5,
    humidity: 65,
    windSpeed: 3.2,
    rainfall: 0.5,
    lightIntensity: 850,
    soilMoisture: 68,
    waterAvail: 450,
    waterTemp: 18,
    waterPh: 7.2,
    connected: true,
    location: "Farm Location: 40.7128°N, 74.0060°W",
  })
  const [alerts, setAlerts] = useState<string[]>([])

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) => ({
        ...prev,
        tempAir: 24.5 + (Math.random() - 0.5) * 2,
        humidity: 65 + (Math.random() - 0.5) * 10,
        windSpeed: 3.2 + (Math.random() - 0.5) * 1,
        rainfall: Math.random() * 2,
        lightIntensity: 850 + (Math.random() - 0.5) * 100,
        soilMoisture: 68 + (Math.random() - 0.5) * 5,
        waterAvail: 450 + (Math.random() - 0.5) * 50,
        waterTemp: 18 + (Math.random() - 0.5) * 1,
        waterPh: 7.2 + (Math.random() - 0.5) * 0.2,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Generate alerts based on sensor thresholds
  useEffect(() => {
    const newAlerts: string[] = []

    if (sensorData.tempAir > 28) newAlerts.push("⚠️ High temperature detected - ensure adequate ventilation")
    if (sensorData.humidity > 75) newAlerts.push("⚠️ High humidity levels - risk of moisture buildup")
    if (sensorData.soilMoisture < 40) newAlerts.push("⚠️ Low soil moisture - irrigation recommended")
    if (sensorData.waterTemp < 10 || sensorData.waterTemp > 25)
      newAlerts.push("⚠️ Water temperature out of optimal range")

    setAlerts(newAlerts)
  }, [sensorData])

  const SensorCard = ({
    icon: Icon,
    label,
    value,
    unit,
    colorScheme,
  }: {
    icon: React.ReactNode
    label: string
    value: number | string
    unit: string
    colorScheme?: string
  }) => {
    const scheme = colorScheme ? SENSOR_COLORS[colorScheme] : SENSOR_COLORS.soil
    return (
      <Card
        className={`border-2 ${scheme.border} bg-gradient-to-br ${scheme.bg} hover:shadow-lg transition-all duration-300`}
      >
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
              <p className="text-3xl font-bold text-foreground">
                {typeof value === "number" ? value.toFixed(1) : value}
                <span className="text-sm font-normal ml-2 text-muted-foreground">{unit}</span>
              </p>
            </div>
            <div className={`${scheme.icon} text-4xl opacity-80`}>{Icon}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">🌾</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Smart Farm Monitor
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-border bg-transparent">
                    <Settings size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border">
                  <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Help</DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive">
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="icon" className="border-border md:hidden bg-transparent">
                <Menu size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status & Animal Selection Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Connection Status */}
          <Card className="border-border bg-card hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full ${sensorData.connected ? "bg-green-500 animate-pulse" : "bg-destructive"}`}
                />
                <div>
                  <p className="text-sm text-muted-foreground">System Connection</p>
                  <p className="font-semibold text-foreground">{sensorData.connected ? "Connected" : "Disconnected"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Animal Type Selector with Image */}
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground mb-3">Select Animal Type</p>
              <Select value={animalType} onValueChange={setAnimalType}>
                <SelectTrigger className="bg-input border-border mb-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="poultry">🐔 Poultry</SelectItem>
                  <SelectItem value="cattle">🐄 Cattle</SelectItem>
                  <SelectItem value="pigs">🐷 Pigs</SelectItem>
                  <SelectItem value="sheep">🐑 Sheep</SelectItem>
                </SelectContent>
              </Select>
              <div className="rounded-lg overflow-hidden border-2 border-primary/20 h-32">
                <img
                  src={ANIMAL_IMAGES[animalType] || "/placeholder.svg"}
                  alt={animalType}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Location (GPS)</p>
                  <p className="font-semibold text-foreground text-sm truncate">{sensorData.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Thermometer size={20} className="text-red-600 dark:text-red-400" />
            Real-Time Environmental Readings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <SensorCard
              icon={<Thermometer size={24} />}
              label="Air Temperature"
              value={sensorData.tempAir}
              unit="°C"
              colorScheme="temperature"
            />
            <SensorCard
              icon={<Cloud size={24} />}
              label="Humidity"
              value={sensorData.humidity}
              unit="%"
              colorScheme="humidity"
            />
            <SensorCard
              icon={<Wind size={24} />}
              label="Wind Speed"
              value={sensorData.windSpeed}
              unit="m/s"
              colorScheme="wind"
            />
            <SensorCard
              icon={<Sun size={24} />}
              label="Rainfall (Last Hour)"
              value={sensorData.rainfall}
              unit="mm"
              colorScheme="sun"
            />
            <SensorCard
              icon={<Eye size={24} />}
              label="Light Intensity"
              value={sensorData.lightIntensity}
              unit="Lux"
              colorScheme="sun"
            />
          </div>
        </div>

        {/* Water & Bedding Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Droplets size={20} className="text-teal-600 dark:text-teal-400" />
            Water & Bedding Conditions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SensorCard
              icon={<Leaf size={24} />}
              label="Soil/Bedding Moisture"
              value={sensorData.soilMoisture}
              unit="%"
              colorScheme="soil"
            />
            <SensorCard
              icon={<Gauge size={24} />}
              label="Water Availability"
              value={sensorData.waterAvail}
              unit="L"
              colorScheme="water"
            />
            <SensorCard
              icon={<Thermometer size={24} />}
              label="Water Temperature"
              value={sensorData.waterTemp}
              unit="°C"
              colorScheme="water"
            />
            <SensorCard
              icon={<Droplets size={24} />}
              label="Water pH"
              value={sensorData.waterPh}
              unit="pH"
              colorScheme="water"
            />
          </div>
        </div>

        {/* Alerts & Insights Section */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-600 dark:text-red-400" />
            Alerts & Actionable Insights
          </h2>

          {alerts.length === 0 ? (
            <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-center justify-center py-4">
                  <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />
                  <p className="text-foreground font-medium">All conditions are optimal</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert, idx) => (
                <Alert
                  key={idx}
                  variant="destructive"
                  className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
                >
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertDescription className="text-red-700 dark:text-red-300">{alert}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          <Button variant="outline" className="mt-6 border-border text-foreground hover:bg-secondary bg-transparent">
            View Historical Data
          </Button>
        </div>
      </div>
    </div>
  )
}
