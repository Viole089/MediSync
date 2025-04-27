"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { API_ROUTES, api } from "@/lib/api"

type User = {
  id: string
  email: string
  name: string
  role: "patient" | "doctor" | "admin"
  isActive: boolean
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
}

type RegisterData = {
  email: string
  password: string
  name: string
  role: "patient" | "doctor"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check for existing session on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")

        if (token) {
          const response = await api.get(API_ROUTES.AUTH.ME)

          if (response.ok) {
            const userData = await response.json()

            // Map backend user data to frontend user model
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.name,
              role: userData.role,
              isActive: userData.is_active || userData.isActive,
            })
          } else {
            localStorage.removeItem("token")
            setUser(null)
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Redirect based on auth status and role
  useEffect(() => {
    if (!isLoading) {
      // Public routes that don't require redirection
      const publicRoutes = ["/", "/login", "/register"]

      if (!user && !publicRoutes.includes(pathname)) {
        // Not logged in and trying to access protected route
        router.push("/login")
      } else if (user) {
        // Logged in users on public auth pages should be redirected to their dashboard
        if (pathname === "/login" || pathname === "/register") {
          router.push(`/dashboard/${user.role}`)
        }

        // Role-specific route protection
        if (pathname.startsWith("/dashboard/doctor") && user.role !== "doctor") {
          router.push(`/dashboard/${user.role}`)
        } else if (pathname.startsWith("/dashboard/admin") && user.role !== "admin") {
          router.push(`/dashboard/${user.role}`)
        } else if (pathname.startsWith("/dashboard/patient") && user.role !== "patient") {
          router.push(`/dashboard/${user.role}`)
        }

        // Inactive doctors should be redirected to a waiting page
        if (user.role === "doctor" && !user.isActive && pathname !== "/waiting-approval") {
          router.push("/waiting-approval")
        }
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Your backend might expect username/password or email/password
      // Adjust according to your auth_router.py implementation
      const response = await fetch(API_ROUTES.AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Use either email or username based on your backend
          email,
          // username: email, // Uncomment if your backend expects username
          password,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Login failed")
      }

      const data = await response.json()

      // Save token to localStorage - adjust token field name if needed
      localStorage.setItem("token", data.access_token || data.token)

      // Set user data - adjust field names based on your backend response
      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        isActive: data.user.is_active || data.user.isActive,
      })

      toast({
        title: "Login successful",
        description: "Welcome back to MediSync!",
      })

      // Redirect based on role
      if (data.user.role === "doctor" && !(data.user.is_active || data.user.isActive)) {
        router.push("/waiting-approval")
      } else {
        router.push(`/dashboard/${data.user.role}`)
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await fetch(API_ROUTES.AUTH.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Registration failed")
      }

      const data = await response.json()

      toast({
        title: "Registration successful",
        description:
          userData.role === "doctor"
            ? "Your account is pending approval by an administrator."
            : "You can now log in to your account.",
      })

      // For patients, we can log them in immediately
      if (userData.role === "patient") {
        localStorage.setItem("token", data.access_token || data.token)
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
          isActive: data.user.is_active || data.user.isActive,
        })
        router.push("/dashboard/patient")
      } else {
        // For doctors, redirect to login page
        router.push("/login")
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please check your information and try again",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
