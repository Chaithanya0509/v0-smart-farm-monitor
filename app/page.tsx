"use client"

import { useState } from "react"
import LoginScreen from "@/components/login-screen"
import DashboardScreen from "@/components/dashboard-screen"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      {!isLoggedIn ? (
        <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <DashboardScreen onLogout={() => setIsLoggedIn(false)} />
      )}
    </>
  )
}
