import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { supabaseUrl, supabaseAnonKey } from "./app/env"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient(
    { req, res },
    {
      supabaseUrl,
      supabaseKey: supabaseAnonKey,
    },
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is not signed in and the current path is not / or /auth/callback
  // redirect the user to /
  if (!session && req.nextUrl.pathname !== "/" && !req.nextUrl.pathname.startsWith("/auth/")) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // If user is signed in and the current path is /
  // redirect the user to /dashboard/home
  if (session && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard/home", req.url))
  }

  // If user is signed in and the current path is /dashboard
  // redirect the user to /dashboard/home
  if (session && req.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/home", req.url))
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
