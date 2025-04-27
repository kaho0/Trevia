import type { Metadata } from "next"
import LoginScreen from "@/components/login-screen"

export const metadata: Metadata = {
  title: "Lovebirds - Login",
  description: "Login to your travel companion app",
}

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <LoginScreen />
    </main>
  )
}
