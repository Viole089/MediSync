"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Stethoscope, Clock } from "lucide-react"
import Link from "next/link"

export default function WaitingApprovalPage() {
  const { logout } = useAuth()

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-healing-100 to-background">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Heart className="h-6 w-6 text-medical-500" />
        <span className="font-bold">MediSync</span>
      </Link>

      <Card className="w-full max-w-md border-healing-200">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="h-16 w-16 rounded-full bg-healing-100 flex items-center justify-center">
              <Stethoscope className="h-8 w-8 text-healing-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Account Pending Approval</CardTitle>
          <CardDescription className="text-center">
            Your healthcare provider account is awaiting administrator verification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-6 bg-healing-50 rounded-lg border border-healing-200">
            <Clock className="h-12 w-12 text-healing-500 mx-auto mb-4" />
            <p className="mb-4">
              Thank you for registering with MediSync. Before you can access the system, an administrator needs to
              verify your credentials and approve your account.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>What happens next?</strong>
              </p>
              <ol className="list-decimal list-inside text-left space-y-1">
                <li>Your medical credentials will be verified</li>
                <li>Your account will be activated by an administrator</li>
                <li>You'll receive an email notification when approved</li>
                <li>You can then log in and access the provider dashboard</li>
              </ol>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full bg-healing-500 hover:bg-healing-600" variant="outline" onClick={logout}>
            Log Out
          </Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            If you have any questions, please contact our verification team at{" "}
            <a href="mailto:verification@medisync.com" className="text-healing-600 underline-offset-4 hover:underline">
              verification@medisync.com
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
