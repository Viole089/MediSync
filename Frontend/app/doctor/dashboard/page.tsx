import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, Clock, TrendingUp, MessageSquare, FileText, Plus } from "lucide-react"
import Link from "next/link"

export default function DoctorDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, Dr. Amina</h1>
          <p className="text-gray-500">Here's what's happening with your patients today.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/doctor/patients/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </Link>
          <Link href="/doctor/ai-assistant">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              AI Assistant
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+4 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Consultation</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24m</div>
            <p className="text-xs text-muted-foreground">-2m from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patient Satisfaction</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="recent">Recent Patients</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>You have 3 appointments remaining today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    time: "14:30",
                    name: "Karim Benali",
                    reason: "Follow-up: Hypertension",
                    status: "Confirmed",
                  },
                  {
                    time: "15:45",
                    name: "Fatima Zahra",
                    reason: "Initial Consultation",
                    status: "Confirmed",
                  },
                  {
                    time: "17:00",
                    name: "Youssef El Mansouri",
                    reason: "Test Results Review",
                    status: "Pending",
                  },
                ].map((appointment, i) => (
                  <div key={i} className="flex items-center p-4 border rounded-lg">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{appointment.name}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            appointment.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{appointment.reason}</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm font-medium">{appointment.time}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button size="sm">Start</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Seen Patients</CardTitle>
              <CardDescription>Your last 5 patient consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: "Today, 11:30",
                    name: "Hassan Alaoui",
                    diagnosis: "Seasonal Allergies",
                    followUp: "2 weeks",
                  },
                  {
                    date: "Today, 10:15",
                    name: "Nadia Benkiran",
                    diagnosis: "Type 2 Diabetes Review",
                    followUp: "3 months",
                  },
                  {
                    date: "Yesterday, 16:45",
                    name: "Omar Tazi",
                    diagnosis: "Lower Back Pain",
                    followUp: "1 week",
                  },
                  {
                    date: "Yesterday, 14:30",
                    name: "Leila Benjelloun",
                    diagnosis: "Prenatal Checkup",
                    followUp: "1 month",
                  },
                  {
                    date: "Apr 25, 09:15",
                    name: "Mehdi Chraibi",
                    diagnosis: "Post-surgical Follow-up",
                    followUp: "Completed",
                  },
                ].map((patient, i) => (
                  <div key={i} className="flex items-center p-4 border rounded-lg">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{patient.name}</h3>
                        <span className="text-xs text-gray-500">{patient.date}</span>
                      </div>
                      <p className="text-sm text-gray-500">{patient.diagnosis}</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm">
                          Follow-up: <span className="font-medium">{patient.followUp}</span>
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Records
                          </Button>
                          <Button variant="outline" size="sm">
                            Notes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
