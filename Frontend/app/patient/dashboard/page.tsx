import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, Shield, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function PatientDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, Karim</h1>
          <p className="text-gray-500">Here's an overview of your health information.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/patient/records">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              View Records
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Apr 30, 2025</div>
            <p className="text-xs text-muted-foreground">Dr. Amina Benali at 14:30</p>
            <Button variant="outline" size="sm" className="mt-4">
              View Details
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medical Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Last updated: Apr 26, 2025</p>
            <Button variant="outline" size="sm" className="mt-4">
              View All
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Security</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Encrypted</div>
            <p className="text-xs text-muted-foreground">End-to-end protection</p>
            <Button variant="outline" size="sm" className="mt-4">
              Security Details
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="summary">
        <TabsList>
          <TabsTrigger value="summary">Health Summary</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Health Overview</CardTitle>
              <CardDescription>A summary of your medical history and current health status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Chronic Conditions</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Hypertension (diagnosed 2022)</li>
                    <li>Type 2 Diabetes (diagnosed 2023)</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Recent Vital Signs</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Blood Pressure</p>
                      <p className="font-medium">135/85 mmHg</p>
                      <p className="text-xs text-gray-500">Apr 26, 2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Blood Glucose</p>
                      <p className="font-medium">142 mg/dL</p>
                      <p className="text-xs text-gray-500">Apr 26, 2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Heart Rate</p>
                      <p className="font-medium">78 bpm</p>
                      <p className="text-xs text-gray-500">Apr 26, 2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-medium">82 kg</p>
                      <p className="text-xs text-gray-500">Apr 26, 2025</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Recent Consultations</h3>
                  <div className="space-y-3">
                    <div className="border-b pb-2">
                      <p className="font-medium">Dr. Amina Benali</p>
                      <p className="text-sm text-gray-600">Hypertension Follow-up</p>
                      <p className="text-xs text-gray-500">Apr 12, 2025</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="font-medium">Dr. Mohammed Tazi</p>
                      <p className="text-sm text-gray-600">Diabetes Management</p>
                      <p className="text-xs text-gray-500">Mar 28, 2025</p>
                    </div>
                    <div>
                      <p className="font-medium">Dr. Amina Benali</p>
                      <p className="text-sm text-gray-600">Annual Checkup</p>
                      <p className="text-xs text-gray-500">Feb 15, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>Your prescribed medications and dosage information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Metformin",
                    dosage: "500mg",
                    frequency: "Twice daily",
                    purpose: "Diabetes management",
                    prescriber: "Dr. Mohammed Tazi",
                    refill: "May 15, 2025",
                  },
                  {
                    name: "Lisinopril",
                    dosage: "10mg",
                    frequency: "Once daily",
                    purpose: "Blood pressure control",
                    prescriber: "Dr. Amina Benali",
                    refill: "Jun 02, 2025",
                  },
                  {
                    name: "Atorvastatin",
                    dosage: "20mg",
                    frequency: "Once daily at bedtime",
                    purpose: "Cholesterol management",
                    prescriber: "Dr. Amina Benali",
                    refill: "May 20, 2025",
                  },
                ].map((medication, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-medium">
                        {medication.name} {medication.dosage}
                      </h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        <span className="text-gray-500">Frequency:</span> {medication.frequency}
                      </p>
                      <p>
                        <span className="text-gray-500">Purpose:</span> {medication.purpose}
                      </p>
                      <p>
                        <span className="text-gray-500">Prescribed by:</span> {medication.prescriber}
                      </p>
                      <p>
                        <span className="text-gray-500">Next refill:</span> {medication.refill}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Alerts</CardTitle>
              <CardDescription>Important notifications about your health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Medication Refill Reminder</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Your Metformin prescription will need to be refilled in the next 20 days.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Request Refill
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Appointment Reminder</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        You have an upcoming appointment with Dr. Amina Benali on April 30, 2025 at 14:30.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Blood Pressure Alert</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Your last blood pressure reading (135/85) is slightly elevated. Continue monitoring and follow
                        your treatment plan.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Recommendations
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
