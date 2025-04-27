"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarDays, Search, User, Users } from "lucide-react"
import { API_ROUTES, api } from "@/lib/api"

type Patient = {
  id: string
  name: string
  email: string
  lastVisit?: string
}

export default function DoctorDashboard() {
  const { user } = useAuth()
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get(API_ROUTES.DOCTOR.PATIENTS)

        if (response.ok) {
          const data = await response.json()

          // Map backend data to frontend model
          setPatients(
            data.map((patient: any) => ({
              id: patient.id || patient._id,
              name: patient.name,
              email: patient.email,
              lastVisit: patient.last_visit || patient.lastVisit,
            })),
          )
        } else {
          console.error("Failed to fetch patients")
          // Use mock data for demonstration
          setMockPatients()
        }
      } catch (error) {
        console.error("Error fetching patients:", error)
        // Use mock data for demonstration
        setMockPatients()
      } finally {
        setIsLoading(false)
      }
    }

    const setMockPatients = () => {
      setPatients([
        {
          id: "1",
          name: "John Smith",
          email: "john.smith@example.com",
          lastVisit: "2023-04-10",
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah.j@example.com",
          lastVisit: "2023-03-22",
        },
        {
          id: "3",
          name: "Michael Brown",
          email: "m.brown@example.com",
          lastVisit: "2023-04-15",
        },
        {
          id: "4",
          name: "Emily Davis",
          email: "emily.d@example.com",
        },
      ])
    }

    fetchPatients()
  }, [])

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewRecords = async (patientId: string) => {
    // Navigate to patient records or open modal
    console.log(`View records for patient ${patientId}`)
  }

  const handleAddRecord = async (patientId: string) => {
    // Open form to add new record
    console.log(`Add record for patient ${patientId}`)
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doctor Information</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user?.name || "Loading..."}</div>
                <p className="text-xs text-muted-foreground">{user?.email || "Loading..."}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : patients.length}</div>
                <p className="text-xs text-muted-foreground">Registered patients</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">No upcoming appointments</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>Your most recently seen patients</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : patients.length > 0 ? (
                <div className="space-y-4">
                  {patients.slice(0, 5).map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{patient.name}</h3>
                        <p className="text-sm text-muted-foreground">{patient.email}</p>
                      </div>
                      {patient.lastVisit && (
                        <span className="text-sm text-muted-foreground">Last visit: {patient.lastVisit}</span>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <a href="#patients">View all patients</a>
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">No patients found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>View and manage your patients</CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
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
              ) : filteredPatients.length > 0 ? (
                <div className="space-y-4">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <h3 className="font-medium">{patient.name}</h3>
                        <p className="text-sm text-muted-foreground">{patient.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewRecords(patient.id)}>
                          View Records
                        </Button>
                        <Button size="sm" onClick={() => handleAddRecord(patient.id)}>
                          Add Record
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {searchQuery ? "No patients match your search." : "No patients found."}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>Manage your upcoming and past appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No appointments scheduled.</p>
              <Button className="mt-4">Schedule New Appointment</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
