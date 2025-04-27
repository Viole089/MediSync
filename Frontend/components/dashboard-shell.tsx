"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Heart,
  Menu,
  User,
  LogOut,
  Settings,
  FileText,
  Pill,
  Activity,
  CalendarDays,
  Stethoscope,
  Users,
  ShieldCheck,
} from "lucide-react"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Determine the dashboard route based on user role
  const dashboardRoute = user?.role ? `/dashboard/${user.role}` : "/dashboard"

  // Navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        href: dashboardRoute,
        active: pathname === dashboardRoute,
        icon:
          user?.role === "patient" ? (
            <Activity className="h-4 w-4" />
          ) : user?.role === "doctor" ? (
            <Stethoscope className="h-4 w-4" />
          ) : (
            <ShieldCheck className="h-4 w-4" />
          ),
      },
      {
        title: "Settings",
        href: "/settings",
        active: pathname === "/settings",
        icon: <Settings className="h-4 w-4" />,
      },
    ]

    // Add role-specific items
    if (user?.role === "patient") {
      return [
        ...baseItems,
        {
          title: "Medical Records",
          href: "/dashboard/patient?tab=medical-records",
          active: pathname.includes("medical-records"),
          icon: <FileText className="h-4 w-4" />,
        },
        {
          title: "Medications",
          href: "/dashboard/patient?tab=medications",
          active: pathname.includes("medications"),
          icon: <Pill className="h-4 w-4" />,
        },
        {
          title: "Vital Signs",
          href: "/dashboard/patient?tab=vitals",
          active: pathname.includes("vitals"),
          icon: <Activity className="h-4 w-4" />,
        },
        {
          title: "Appointments",
          href: "/dashboard/patient?tab=appointments",
          active: pathname.includes("appointments"),
          icon: <CalendarDays className="h-4 w-4" />,
        },
      ]
    } else if (user?.role === "doctor") {
      return [
        ...baseItems,
        {
          title: "Patients",
          href: "/dashboard/doctor?tab=patients",
          active: pathname.includes("patients"),
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "Medical Records",
          href: "/dashboard/doctor?tab=records",
          active: pathname.includes("records"),
          icon: <FileText className="h-4 w-4" />,
        },
        {
          title: "Appointments",
          href: "/dashboard/doctor?tab=appointments",
          active: pathname.includes("appointments"),
          icon: <CalendarDays className="h-4 w-4" />,
        },
      ]
    } else if (user?.role === "admin") {
      return [
        ...baseItems,
        {
          title: "Doctors",
          href: "/dashboard/admin?tab=doctors",
          active: pathname.includes("doctors"),
          icon: <Stethoscope className="h-4 w-4" />,
        },
        {
          title: "Patients",
          href: "/dashboard/admin?tab=patients",
          active: pathname.includes("patients"),
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "Verification",
          href: "/dashboard/admin?tab=verification",
          active: pathname.includes("verification"),
          icon: <ShieldCheck className="h-4 w-4" />,
        },
      ]
    }

    return baseItems
  }

  const navItems = getNavItems()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[280px]">
                <Link href="/" className="flex items-center gap-2 py-4" onClick={() => setOpen(false)}>
                  <Heart className="h-6 w-6 text-medical-500" />
                  <span className="font-bold">MediSync</span>
                </Link>
                <nav className="flex flex-col gap-4 py-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm flex items-center gap-2 ${item.active ? "font-medium text-medical-600" : "text-muted-foreground"}`}
                      onClick={() => setOpen(false)}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-medical-500" />
              <span className="font-bold hidden md:inline-block">MediSync</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm flex items-center gap-2 ${
                  item.active
                    ? "font-medium text-medical-600"
                    : "text-muted-foreground hover:text-medical-600 transition-colors"
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="border-medical-200">
                  <User className="h-5 w-5 text-medical-500" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6 md:py-10">{children}</main>
    </div>
  )
}
