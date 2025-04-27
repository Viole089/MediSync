"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, User, Stethoscope } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<"patient" | "doctor">("patient")
  const [passwordError, setPasswordError] = useState("")
  const { register, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    setPasswordError("")
    await register({ name, email, password, role })
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-medical-100 to-background">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Heart className="h-6 w-6 text-medical-500" />
        <span className="font-bold">MediSync</span>
      </Link>

      <Card className="w-full max-w-md border-medical-200">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-medical-100 flex items-center justify-center">
              <Heart className="h-6 w-6 text-medical-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
          <CardDescription className="text-center">Join MediSync's secure healthcare platform</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-medical-200 focus:border-medical-500 focus:ring-medical-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-medical-200 focus:border-medical-500 focus:ring-medical-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-medical-200 focus:border-medical-500 focus:ring-medical-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-medical-200 focus:border-medical-500 focus:ring-medical-500"
              />
              {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
            </div>
            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup
                value={role}
                onValueChange={(value) => setRole(value as "patient" | "doctor")}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-medical-50">
                  <RadioGroupItem value="patient" id="patient" className="text-medical-500" />
                  <Label htmlFor="patient" className="font-normal flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4 text-medical-500" />
                    Patient
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-medical-50">
                  <RadioGroupItem value="doctor" id="doctor" className="text-healing-500" />
                  <Label htmlFor="doctor" className="font-normal flex items-center gap-2 cursor-pointer">
                    <Stethoscope className="h-4 w-4 text-healing-500" />
                    Healthcare Provider
                  </Label>
                </div>
              </RadioGroup>
              {role === "doctor" && (
                <p className="text-sm text-muted-foreground mt-2 p-3 bg-healing-50 rounded-md border border-healing-200">
                  <strong>Note:</strong> Healthcare provider accounts require verification and admin approval before
                  activation. Please be prepared to provide your medical credentials.
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              className={`w-full ${role === "patient" ? "bg-medical-500 hover:bg-medical-600" : "bg-healing-500 hover:bg-healing-600"}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Register"}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-medical-600 underline-offset-4 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
