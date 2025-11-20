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
  }: {
    icon: React.ReactNode
    label: string
    value: number | string
    unit: string
  }) => (
    <Card className="border-border bg-card hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-2xl font-bold text-foreground">
              {typeof value === "number" ? value.toFixed(1) : value}
              <span className="text-sm font-normal ml-1 text-muted-foreground">{unit}</span>
            </p>
          </div>
          <div className="text-primary/20">{Icon}</div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">🌾</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">Smart Farm Monitor</h1>
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
        {/* Status Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Connection Status */}
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${sensorData.connected ? "bg-primary" : "bg-destructive"}`} />
                <div>
                  <p className="text-sm text-muted-foreground">System Connection</p>
                  <p className="font-semibold text-foreground">{sensorData.connected ? "Connected" : "Disconnected"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Animal Type Selector */}
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-3">Select Animal Type</p>
              <Select value={animalType} onValueChange={setAnimalType}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="poultry">Poultry</SelectItem>
                  <SelectItem value="cattle">Cattle</SelectItem>
                  <SelectItem value="pigs">Pigs</SelectItem>
                  <SelectItem value="sheep">Sheep</SelectItem>
                </SelectContent>
              </Select>
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
            <Thermometer size={20} className="text-primary" />
            Real-Time Environmental Readings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <SensorCard icon={<Thermometer size={24} />} label="Air Temperature" value={sensorData.tempAir} unit="°C" />
            <SensorCard icon={<Cloud size={24} />} label="Humidity" value={sensorData.humidity} unit="%" />
            <SensorCard icon={<Wind size={24} />} label="Wind Speed" value={sensorData.windSpeed} unit="m/s" />
            <SensorCard icon={<Sun size={24} />} label="Rainfall (Last Hour)" value={sensorData.rainfall} unit="mm" />
            <SensorCard icon={<Eye size={24} />} label="Light Intensity" value={sensorData.lightIntensity} unit="Lux" />
          </div>
        </div>

        {/* Water & Bedding Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Droplets size={20} className="text-primary" />
            Water & Bedding Conditions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SensorCard
              icon={<Leaf size={24} />}
              label="Soil/Bedding Moisture"
              value={sensorData.soilMoisture}
              unit="%"
            />
            <SensorCard icon={<Gauge size={24} />} label="Water Availability" value={sensorData.waterAvail} unit="L" />
            <SensorCard
              icon={<Thermometer size={24} />}
              label="Water Temperature"
              value={sensorData.waterTemp}
              unit="°C"
            />
            <SensorCard icon={<Droplets size={24} />} label="Water pH" value={sensorData.waterPh} unit="pH" />
          </div>
        </div>

        {/* Alerts & Insights Section */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-primary" />
            Alerts & Actionable Insights
          </h2>

          {alerts.length === 0 ? (
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-center justify-center py-4">
                  <CheckCircle2 size={20} className="text-primary" />
                  <p className="text-foreground font-medium">All conditions are optimal</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert, idx) => (
                <Alert key={idx} variant="destructive" className="bg-destructive/10 border-destructive/30">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-destructive">{alert}</AlertDescription>
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
