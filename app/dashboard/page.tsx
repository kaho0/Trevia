import { redirect } from "next/navigation"

export default function Dashboard() {
  // This should redirect to /dashboard/home
  redirect("/dashboard/home")
}
