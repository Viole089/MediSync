"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [defaultTab, setDefaultTab] = useState("doctor")

  useEffect(() => {
    const role = searchParams.get("role")
    if (role === "patient") {
      setDefaultTab("patient")
    }
  }, [searchParams])

  const handleSignup = async (e: React.FormEvent, role: string) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect directly to the chatbot with role parameter
      router.push(`/chatbot?role=${role}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-teal-600">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="bg-teal-600 text-white p-2 rounded-md">
                <Brain size={24} />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Join MediSync to transform your healthcare experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="doctor">Doctor</TabsTrigger>
                <TabsTrigger value="patient">Patient</TabsTrigger>
              </TabsList>

              <TabsContent value="doctor">
                <form onSubmit={(e) => handleSignup(e, "doctor")}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor-first-name">First Name</Label>
                        <Input id="doctor-first-name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doctor-last-name">Last Name</Label>
                        <Input id="doctor-last-name" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-email">Email</Label>
                      <Input id="doctor-email" type="email" placeholder="doctor@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-license">Medical License Number</Label>
                      <Input id="doctor-license" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-password">Password</Label>
                      <Input id="doctor-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-confirm-password">Confirm Password</Label>
                      <Input id="doctor-confirm-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Sign Up as Doctor"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="patient">
                <form onSubmit={(e) => handleSignup(e, "patient")}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patient-first-name">First Name</Label>
                        <Input id="patient-first-name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patient-last-name">Last Name</Label>
                        <Input id="patient-last-name" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-cin">CIN (National ID)</Label>
                      <Input id="patient-cin" placeholder="e.g. AB123456" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-dob">Date of Birth</Label>
                      <Input id="patient-dob" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-password">Password</Label>
                      <Input id="patient-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-confirm-password">Confirm Password</Label>
                      <Input id="patient-confirm-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Sign Up as Patient"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-600 hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
