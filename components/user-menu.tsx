"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { ChevronDown, User } from "lucide-react"

export function UserMenu() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    router.push("/")
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="border-emerald-700 text-emerald-700 hover:bg-emerald-50"
          onClick={() => router.push("/sign-in")}
        >
          Sign In
        </Button>
        <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => router.push("/register")}>
          Register
        </Button>
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700">
          <User size={16} />
        </div>
        <span>Hi, {user.name}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border">
          <div className="py-2">
            <Link
              href="/account/subscriptions"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Subscriptions
            </Link>
            <Link
              href="/account/orders"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Orders
            </Link>
            <Link
              href="/account"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Account
            </Link>
            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
