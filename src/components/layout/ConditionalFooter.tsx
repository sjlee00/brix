'use client'

import { useAuth } from "@/hooks/useAuth"
import { Footer } from "./Footer"

export function ConditionalFooter() {
  const { user } = useAuth()

  // Don't show footer when user is signed in
  if (user) {
    return null
  }

  // Show footer when not signed in
  return <Footer />
}
