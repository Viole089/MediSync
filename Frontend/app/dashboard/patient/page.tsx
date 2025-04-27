"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, FileText, User, Activity, Pill, Thermometer, Heart, TreesIcon as Lungs } from "lucide-react"
import { API_ROUTES, api } from "@/lib/api"

type MedicalRecord = {
  id: string
  date: string
  doctorName: string
  recordType: "diagnosis" | "medication" | "allergy" | "procedure"
  title: string
  description: string
  status?: "active" | "completed" | "scheduled"
}

type Medication = {
  id: string
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate?: string
  instructions?: string
}

type VitalSign = {
  id: string
  type: "blood_pressure" | "heart_rate" | "temperature" | "oxygen" | "weight"
  value: string
  unit: string
  date: string
  status: "normal" | "warning" | "critical"
}

export default function PatientDashboard() {
  const { user } = useAuth()
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([])
  const [medications, setMedications] = useState<Medication[]>([])
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Fetch data in parallel
        const [recordsResponse, medicationsResponse, vitalsResponse] = await Promise.all([
          api.get(API_ROUTES.PATIENT.MEDICAL_RECORDS),
          api.get(API_ROUTES.PATIENT.MEDICATIONS),
          api.get(API_ROUTES.PATIENT.VITALS),
        ])

        // Process responses
        if (recordsResponse.ok && medicationsResponse.ok && vitalsResponse.ok) {
          const recordsData = await recordsResponse.json()
          const medicationsData = await medicationsResponse.json()
          const vitalsData = await vitalsResponse.json()

          // Map backend data to frontend models if needed
          setMedicalRecords(mapMedicalRecords(recordsData))
          setMedications(mapMedications(medicationsData))
          setVitalSigns(mapVitalSigns(vitalsData))
        } else {
          console.error("Failed to fetch patient data")
          // Use mock data for demonstration if API fails
          setMockData()
        }
      } catch (error) {
        console.error("Error fetching patient data:", error)
        // Use mock data for demonstration
        setMockData()
      } finally {
        setIsLoading(false)
      }
    }

    fetchPatientData()
  }, [])

  // Helper function to map backend medical records to frontend format
  const mapMedicalRecords = (data: any[]): MedicalRecord[] => {
    return data.map((record) => ({
      id: record.id || record._id,
      date: record.date || new Date(record.created_at).toISOString().split("T")[0],
      doctorName: record.doctor_name || record.doctorName,
      recordType: record.record_type || record.recordType,
      title: record.title,
      description: record.description,
      status: record.status,
    }))
  }

  // Helper function to map backend medications to frontend format
  const mapMedications = (data: any[]): Medication[] => {
    return data.map((med) => ({
      id: med.id || med._id,
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      startDate: med.start_date || med.startDate,
      endDate: med.end_date || med.endDate,
      instructions: med.instructions,
    }))
  }

  // Helper function to map backend vital signs to frontend format
  const mapVitalSigns = (data: any[]): VitalSign[] => {
    return data.map((vital) => ({
      id: vital.id || vital._id,
      type: vital.type,
      value: vital.value,
      unit: vital.unit,
      date: vital.date || new Date(vital.created_at).toISOString().split("T")[0],
      status: vital.status,
    }))
  }

  // Set mock data for development/testing
  const setMockData = () => {
    setMedicalRecords([
      {
        id: "1",
        date: "2023-04-15",
        doctorName: "Dr. Sarah Johnson",
        recordType: "diagnosis",
        title: "Hypertension",
        description: "Stage 1 hypertension diagnosed. Recommended lifestyle changes and monitoring.",
        status: "active",
      },
      {
        id: "2",
        date: "2023-03-10",
        doctorName: "Dr. Michael Chen",
        recordType: "medication",
        title: "Lisinopril Prescription",
        description: "10mg daily for blood pressure management.",
        status: "active",
      },
      {
        id: "3",
        date: "2023-02-22",
        doctorName: "Dr. Sarah Johnson",
        recordType: "allergy",
        title: "Penicillin Allergy",
        description: "Moderate allergic reaction. Avoid all penicillin-based antibiotics.",
        status: "active",
      },
      {
        id: "4",
        date: "2023-01-05",
        doctorName: "Dr. Robert Williams",
        recordType: "procedure",
        title: "Routine Blood Work",
        description: "Complete blood count and metabolic panel. Results within normal ranges.",
        status: "completed",
      },
    ])

    setMedications([
      {
        id: "1",
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2023-03-10",
        instructions: "Take in the morning with food",
      },
      {
        id: "2",
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily",
        startDate: "2023-02-15",
        instructions: "Take in the evening",
      },
    ])

    setVitalSigns([
      {
        id: "1",
        type: "blood_pressure",
        value: "128/82",
        unit: "mmHg",
        date: "2023-04-20",
        status: "normal",
      },
      {
        id: "2",
        type: "heart_rate",
        value: "72",
        unit: "bpm",
        date: "2023-04-20",
        status: "normal",
      },
      {
        id: "3",
        type: "temperature",
        value: "98.6",
        unit: "°F",
        date: "2023-04-20",
        status: "normal",
      },
      {
        id: "4",
        type: "oxygen",
        value: "98",
        unit: "%",
        date: "2023-04-20",
        status: "normal",
      },
    ])
  }

  const getVitalIcon = (type: string) => {
    switch (type) {
      case "blood_pressure":
        return <Activity className="h-5 w-5 text-healing-500" />
      case "heart_rate":
        return <Heart className="h-5 w-5 text-alert-500" />
      case "temperature":
        return <Thermometer className="h-5 w-5 text-medical-500" />
      case "oxygen":
        return <Lungs className="h-5 w-5 text-success-500" />
      default:
        return <Activity className="h-5 w-5 text-medical-500" />
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "normal":
        return "health-status-normal"
      case "warning":
        return "health-status-warning"
      case "critical":
        return "health-status-critical"
      default:
        return ""
    }
  }

  const getRecordTypeClass = (type: string) => {
    switch (type) {
      case "diagnosis":
        return "medical-record-item diagnosis"
      case "medication":
        return "medical-record-item medication"
      case "allergy":
        return "medical-record-item allergy"
      case "procedure":
        return "medical-record-item procedure"
      default:
        return "medical-record-item"
    }
  }

  const getRecordStatusBadge = (status?: string) => {
    if (!status) return null

    switch (status) {
      case "active":
        return <Badge className="bg-success-500">Active</Badge>
      case "completed":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Completed
          </Badge>
        )
      case "scheduled":
        return <Badge className="bg-healing-500">Scheduled</Badge>
      default:
        return null
    }
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-medical-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Personal Information</CardTitle>
                <User className="h-4 w-4 text-medical-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user?.name || "Loading..."}</div>
                <p className="text-xs text-muted-foreground">{user?.email || "Loading..."}</p>
              </CardContent>
            </Card>
            <Card className="border-medical-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Medical Records</CardTitle>
                <FileText className="h-4 w-4 text-medical-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : medicalRecords.length}</div>
                <p className="text-xs text-muted-foreground">Total medical records</p>
              </CardContent>
            </Card>
            <Card className="border-medical-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Medications</CardTitle>
                <Pill className="h-4 w-4 text-medical-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : medications.length}</div>
                <p className="text-xs text-muted-foreground">Current prescriptions</p>
              </CardContent>
            </Card>
            <Card className="border-medical-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                <CalendarDays className="h-4 w-4 text-medical-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">No upcoming appointments</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-medical-200">
              <CardHeader>
                <CardTitle>Vital Signs</CardTitle>
                <CardDescription>Your most recent health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : vitalSigns.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {vitalSigns.map((vital) => (
                      <div key={vital.id} className="vital-sign">
                        <div className="mr-2">{getVitalIcon(vital.type)}</div>
                        <div>
                          <div className={`vital-sign-value ${getStatusClass(vital.status)}`}>
                            {vital.value} <span className="text-sm">{vital.unit}</span>
                          </div>
                          <div className="vital-sign-label">{vital.type.replace("_", " ")}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No vital signs recorded.</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-medical-200">
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>Your active prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : medications.length > 0 ? (
                  <div className="space-y-4">
                    {medications.map((medication) => (
                      <div
                        key={medication.id}
                        className="flex items-start space-x-3 p-3 rounded-md border border-healing-100 bg-healing-50"
                      >
                        <Pill className="h-5 w-5 text-healing-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">
                            {medication.name} {medication.dosage}
                          </h3>
                          <p className="text-sm text-muted-foreground">{medication.frequency}</p>
                          {medication.instructions && (
                            <p className="text-xs text-muted-foreground mt-1">{medication.instructions}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No active medications.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle>Recent Medical Records</CardTitle>
              <CardDescription>Your most recent medical records and updates</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : medicalRecords.length > 0 ? (
                <div className="space-y-4">
                  {medicalRecords.slice(0, 3).map((record) => (
                    <div key={record.id} className={getRecordTypeClass(record.recordType)}>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{record.title}</h3>
                        {getRecordStatusBadge(record.status)}
                      </div>
                      <p className="text-sm">{record.description}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <span>Dr. {record.doctorName}</span>
                        <span>{record.date}</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <a href="#medical-records">View all records</a>
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">No medical records found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical-records" className="space-y-4">
          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>View your complete medical history</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : medicalRecords.length > 0 ? (
                <div className="space-y-6">
                  {medicalRecords.map((record) => (
                    <div key={record.id} className={getRecordTypeClass(record.recordType)}>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-lg">{record.title}</h3>
                        {getRecordStatusBadge(record.status)}
                      </div>
                      <p className="text-sm mb-2">{record.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Dr. {record.doctorName}</span>
                        <span>{record.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No medical records found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle>Medications</CardTitle>
              <CardDescription>View and manage your prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : medications.length > 0 ? (
                <div className="space-y-6">
                  {medications.map((medication) => (
                    <div key={medication.id} className="border-l-4 border-l-healing-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-lg">{medication.name}</h3>
                        <Badge className="bg-healing-500">Active</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Dosage</p>
                          <p className="text-sm">{medication.dosage}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Frequency</p>
                          <p className="text-sm">{medication.frequency}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Start Date</p>
                          <p className="text-sm">{medication.startDate}</p>
                        </div>
                        {medication.endDate && (
                          <div>
                            <p className="text-xs text-muted-foreground">End Date</p>
                            <p className="text-sm">{medication.endDate}</p>
                          </div>
                        )}
                      </div>
                      {medication.instructions && (
                        <div className="mt-2 p-2 bg-healing-50 rounded-md text-sm">
                          <p className="text-xs text-muted-foreground mb-1">Instructions</p>
                          {medication.instructions}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No medications found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle>Vital Signs</CardTitle>
              <CardDescription>Track your health metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : vitalSigns.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vitalSigns.map((vital) => (
                      <div key={vital.id} className="p-4 border rounded-lg bg-background">
                        <div className="flex items-center gap-3 mb-2">
                          {getVitalIcon(vital.type)}
                          <h3 className="font-medium capitalize">{vital.type.replace("_", " ")}</h3>
                        </div>
                        <div className={`text-3xl font-bold mb-1 ${getStatusClass(vital.status)}`}>
                          {vital.value} <span className="text-base font-normal">{vital.unit}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Last updated: {vital.date}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <Button className="bg-medical-500 hover:bg-medical-600">Record New Vital Signs</Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No vital signs recorded.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card className="border-medical-200">
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>Manage your upcoming and past appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No appointments scheduled.</p>
              <Button className="mt-4 bg-medical-500 hover:bg-medical-600">Schedule New Appointment</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
