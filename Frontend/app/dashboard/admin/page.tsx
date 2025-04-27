"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Search, ShieldCheck, User, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { API_ROUTES, api } from "@/lib/api"

type Doctor = {
  id: string
  name: string
  email: string
  isActive: boolean
  registrationDate: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get(API_ROUTES.ADMIN.DOCTORS)

        if (response.ok) {
          const data = await response.json()

          // Map backend data to frontend model
          setDoctors(
            data.map((doctor: any) => ({
              id: doctor.id || doctor._id,
              name: doctor.name,
              email: doctor.email,
              isActive: doctor.is_active || doctor.isActive,
              registrationDate:
                doctor.registration_date ||
                doctor.registrationDate ||
                new Date(doctor.created_at || doctor.createdAt).toISOString().split("T")[0],
            })),
          )
        } else {
          console.error("Failed to fetch doctors")
          // Use mock data for demonstration
          setMockDoctors()
        }
      } catch (error) {
        console.error("Error fetching doctors:", error)
        // Use mock data for demonstration
        setMockDoctors()
      } finally {
        setIsLoading(false)
      }
    }

    const setMockDoctors = () => {
      setDoctors([
        {
          id: "1",
          name: "Dr. Sarah Johnson",
          email: "sarah.johnson@example.com",
          isActive: true,
          registrationDate: "2023-01-15",
        },
        {
          id: "2",
          name: "Dr. Michael Chen",
          email: "m.chen@example.com",
          isActive: true,
          registrationDate: "2023-02-10",
        },
        {
          id: "3",
          name: "Dr. Robert Williams",
          email: "r.williams@example.com",
          isActive: false,
          registrationDate: "2023-04-05",
        },
        {
          id: "4",
          name: "Dr. Emily Davis",
          email: "e.davis@example.com",
          isActive: false,
          registrationDate: "2023-04-12",
        },
      ])
    }

    fetchDoctors()
  }, [])

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const pendingDoctors = doctors.filter((doctor) => !doctor.isActive)

  const handleApproveDoctor = async (doctorId: string) => {
    try {
      const response = await api.post(API_ROUTES.ADMIN.APPROVE_DOCTOR(doctorId), {})

      if (response.ok) {
        // Update the local state
        setDoctors(doctors.map((doctor) => (doctor.id === doctorId ? { ...doctor, isActive: true } : doctor)))

        toast({
          title: "Doctor approved",
          description: "The doctor has been approved and can now access the system.",
        })
      } else {
        throw new Error("Failed to approve doctor")
      }
    } catch (error) {
      console.error("Error approving doctor:", error)
      toast({
        variant: "destructive",
        title: "Approval failed",
        description: "There was an error approving the doctor. Please try again.",
      })
    }
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admin Information</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user?.name || "Loading..."}</div>
                <p className="text-xs text-muted-foreground">{user?.email || "Loading..."}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : pendingDoctors.length}</div>
                <p className="text-xs text-muted-foreground">Doctors awaiting approval</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : doctors.length}</div>
                <p className="text-xs text-muted-foreground">Registered healthcare providers</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Doctors waiting for account activation</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : pendingDoctors.length > 0 ? (
                <div className="space-y-4">
                  {pendingDoctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor.email}</p>
                        <p className="text-xs text-muted-foreground">Registered: {doctor.registrationDate}</p>
                      </div>
                      <Button size="sm" onClick={() => handleApproveDoctor(doctor.id)}>
                        Approve
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No pending approvals.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Management</CardTitle>
              <CardDescription>View and manage healthcare providers</CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search doctors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : filteredDoctors.length > 0 ? (
                <div className="space-y-4">
                  {filteredDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{doctor.name}</h3>
                          <Badge variant={doctor.isActive ? "default" : "outline"}>
                            {doctor.isActive ? "Active" : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{doctor.email}</p>
                        <p className="text-xs text-muted-foreground">Registered: {doctor.registrationDate}</p>
                      </div>
                      <div className="flex gap-2">
                        {!doctor.isActive && (
                          <Button size="sm" onClick={() => handleApproveDoctor(doctor.id)}>
                            Approve
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {searchQuery ? "No doctors match your search." : "No doctors found."}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>View and manage patient accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Patient management features coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
