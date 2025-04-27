import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Lock, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function PatientRecords() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Medical Records</h1>
        <p className="text-gray-500">Securely access and manage your health information.</p>
      </div>

      <div className="flex items-center justify-between bg-teal-50 p-4 rounded-lg border border-teal-200">
        <div className="flex items-center gap-3">
          <div className="bg-teal-100 p-2 rounded-full">
            <Lock className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h3 className="font-medium">End-to-End Encrypted</h3>
            <p className="text-sm text-gray-600">
              Your medical records are securely encrypted and only accessible to you.
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Security Details
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="lab">Lab Results</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complete Medical History</CardTitle>
              <CardDescription>All your medical records in chronological order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "Consultation",
                    title: "Hypertension Follow-up",
                    doctor: "Dr. Amina Benali",
                    date: "Apr 12, 2025",
                    summary: "Blood pressure slightly elevated at 135/85. Medication adjusted. Follow-up in 2 weeks.",
                  },
                  {
                    type: "Lab Result",
                    title: "Comprehensive Metabolic Panel",
                    doctor: "Dr. Mohammed Tazi",
                    date: "Apr 05, 2025",
                    summary: "Blood glucose: 142 mg/dL (elevated). Kidney and liver function normal.",
                  },
                  {
                    type: "Consultation",
                    title: "Diabetes Management",
                    doctor: "Dr. Mohammed Tazi",
                    date: "Mar 28, 2025",
                    summary:
                      "Reviewed blood glucose logs. Adjusted Metformin dosage. Dietary recommendations provided.",
                  },
                  {
                    type: "Imaging",
                    title: "Chest X-Ray",
                    doctor: "Dr. Fatima Zahra",
                    date: "Mar 15, 2025",
                    summary: "No abnormalities detected. Clear lung fields.",
                  },
                  {
                    type: "Consultation",
                    title: "Annual Checkup",
                    doctor: "Dr. Amina Benali",
                    date: "Feb 15, 2025",
                    summary:
                      "General health assessment. Hypertension and diabetes stable but requiring ongoing management.",
                  },
                ].map((record, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              record.type === "Consultation"
                                ? "default"
                                : record.type === "Lab Result"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {record.type}
                          </Badge>
                          <h3 className="font-medium">{record.title}</h3>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {record.doctor}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {record.date}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{record.summary}</p>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Share with Doctor
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consultations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Records</CardTitle>
              <CardDescription>Records of your doctor visits and consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Hypertension Follow-up",
                    doctor: "Dr. Amina Benali",
                    specialty: "Cardiology",
                    date: "Apr 12, 2025",
                    summary: "Blood pressure slightly elevated at 135/85. Medication adjusted. Follow-up in 2 weeks.",
                    notes: "Patient reports occasional headaches. Advised on sodium reduction and regular exercise.",
                  },
                  {
                    title: "Diabetes Management",
                    doctor: "Dr. Mohammed Tazi",
                    specialty: "Endocrinology",
                    date: "Mar 28, 2025",
                    summary:
                      "Reviewed blood glucose logs. Adjusted Metformin dosage. Dietary recommendations provided.",
                    notes:
                      "Patient adhering well to medication schedule. Discussed importance of regular foot examinations.",
                  },
                  {
                    title: "Annual Checkup",
                    doctor: "Dr. Amina Benali",
                    specialty: "Cardiology",
                    date: "Feb 15, 2025",
                    summary:
                      "General health assessment. Hypertension and diabetes stable but requiring ongoing management.",
                    notes:
                      "Recommended increasing physical activity to 30 minutes daily. Scheduled follow-up lab work.",
                  },
                ].map((record, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{record.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {record.doctor} ({record.specialty})
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {record.date}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div>
                        <p className="text-sm font-medium">Summary:</p>
                        <p className="text-sm text-gray-600">{record.summary}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Doctor's Notes:</p>
                        <p className="text-sm text-gray-600">{record.notes}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm">
                        View Full Record
                      </Button>
                      <Button variant="outline" size="sm">
                        Share with Doctor
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Results</CardTitle>
              <CardDescription>Your blood work and other laboratory test results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Comprehensive Metabolic Panel",
                    doctor: "Dr. Mohammed Tazi",
                    date: "Apr 05, 2025",
                    lab: "Central Medical Laboratory, Casablanca",
                    results: [
                      { name: "Blood Glucose", value: "142 mg/dL", status: "High", range: "70-99 mg/dL" },
                      { name: "HbA1c", value: "6.8%", status: "High", range: "4.0-5.6%" },
                      { name: "Creatinine", value: "0.9 mg/dL", status: "Normal", range: "0.6-1.2 mg/dL" },
                      { name: "ALT", value: "22 U/L", status: "Normal", range: "7-56 U/L" },
                    ],
                  },
                  {
                    title: "Lipid Panel",
                    doctor: "Dr. Amina Benali",
                    date: "Feb 15, 2025",
                    lab: "Central Medical Laboratory, Casablanca",
                    results: [
                      { name: "Total Cholesterol", value: "210 mg/dL", status: "High", range: "< 200 mg/dL" },
                      { name: "LDL Cholesterol", value: "130 mg/dL", status: "High", range: "< 100 mg/dL" },
                      { name: "HDL Cholesterol", value: "45 mg/dL", status: "Normal", range: "> 40 mg/dL" },
                      { name: "Triglycerides", value: "150 mg/dL", status: "Normal", range: "< 150 mg/dL" },
                    ],
                  },
                ].map((record, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{record.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {record.doctor}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {record.date}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{record.lab}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-3">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left p-2">Test</th>
                            <th className="text-left p-2">Result</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Reference Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.results.map((result, j) => (
                            <tr key={j} className="border-t">
                              <td className="p-2">{result.name}</td>
                              <td className="p-2 font-medium">{result.value}</td>
                              <td className="p-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    result.status === "Normal"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {result.status}
                                </span>
                              </td>
                              <td className="p-2 text-gray-500">{result.range}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm">
                        View Full Report
                      </Button>
                      <Button variant="outline" size="sm">
                        Track Changes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imaging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Imaging Records</CardTitle>
              <CardDescription>X-rays, MRIs, and other imaging studies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Chest X-Ray",
                    doctor: "Dr. Fatima Zahra",
                    date: "Mar 15, 2025",
                    facility: "Radiology Center, Casablanca",
                    findings: "No abnormalities detected. Clear lung fields. Heart size normal.",
                    recommendation: "No follow-up imaging required at this time.",
                  },
                  {
                    title: "Abdominal Ultrasound",
                    doctor: "Dr. Mohammed Tazi",
                    date: "Jan 10, 2025",
                    facility: "Imaging Department, Central Hospital",
                    findings:
                      "Liver, gallbladder, pancreas, and spleen appear normal. No masses or abnormalities detected.",
                    recommendation: "Routine follow-up in one year recommended.",
                  },
                ].map((record, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{record.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {record.doctor}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {record.date}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{record.facility}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Image preview placeholder</p>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium">Findings:</p>
                          <p className="text-sm text-gray-600">{record.findings}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Recommendation:</p>
                          <p className="text-sm text-gray-600">{record.recommendation}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm">
                        View Images
                      </Button>
                      <Button variant="outline" size="sm">
                        View Full Report
                      </Button>
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
