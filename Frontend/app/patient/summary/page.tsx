import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Brain, AlertCircle, Calendar } from "lucide-react"

export default function HealthSummary() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Health Summary</h1>
          <p className="text-gray-500">AI-generated overview of your medical history and health status.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Summary
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between bg-teal-50 p-4 rounded-lg border border-teal-200">
        <div className="flex items-center gap-3">
          <div className="bg-teal-100 p-2 rounded-full">
            <Brain className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h3 className="font-medium">AI-Powered Summary</h3>
            <p className="text-sm text-gray-600">
              This summary is generated using secure AI analysis of your encrypted medical records.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">Last updated: Apr 26, 2025</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conditions">Conditions</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Overview</CardTitle>
              <CardDescription>A comprehensive summary of your health status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Summary</h3>
                  <p className="text-gray-600">
                    Karim Benali is a 52-year-old male with hypertension and type 2 diabetes. Both conditions are
                    currently being managed with medication and lifestyle modifications. Recent vital signs show
                    slightly elevated blood pressure and blood glucose levels. Regular follow-up appointments have been
                    maintained with consistent medication adherence.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Key Health Indicators</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Blood Pressure</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-amber-500">135/85 mmHg</div>
                        <p className="text-xs text-gray-500">Slightly elevated</p>
                        <div className="mt-2 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-amber-500 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Target: &lt;130/80 mmHg</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Blood Glucose</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-amber-500">142 mg/dL</div>
                        <p className="text-xs text-gray-500">Above target range</p>
                        <div className="mt-2 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-amber-500 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Target: 70-130 mg/dL</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Medication Adherence</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-500">95%</div>
                        <p className="text-xs text-gray-500">Excellent</p>
                        <div className="mt-2 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: "95%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Based on prescription refill data</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Health Alert</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Your blood pressure and blood glucose readings are slightly above target ranges. Your doctor has
                        adjusted your medications at your last visit to address this.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conditions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Conditions</CardTitle>
              <CardDescription>Detailed information about your diagnosed conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Hypertension (High Blood Pressure)</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Diagnosed</p>
                      <p className="font-medium">2022</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <p className="font-medium">Being managed with medication</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Current Treatment</p>
                      <p className="font-medium">Lisinopril 10mg daily</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Last Assessment</p>
                      <p className="font-medium">Apr 12, 2025 (Dr. Amina Benali)</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-1">Notes</p>
                    <p className="text-sm text-gray-600">
                      Blood pressure has been generally well-controlled with medication, though recent readings show
                      slight elevation. Medication dosage was adjusted at the last appointment. Patient has been advised
                      to reduce sodium intake and increase physical activity.
                    </p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Type 2 Diabetes</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Diagnosed</p>
                      <p className="font-medium">2023</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <p className="font-medium">Being managed with medication and diet</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Current Treatment</p>
                      <p className="font-medium">Metformin 500mg twice daily</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Last Assessment</p>
                      <p className="font-medium">Mar 28, 2025 (Dr. Mohammed Tazi)</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-1">Notes</p>
                    <p className="text-sm text-gray-600">
                      Blood glucose levels have been fluctuating but generally trending toward better control. HbA1c was
                      6.8% at last check (target &lt;7.0%). Patient has been adhering well to medication regimen and has
                      made some dietary improvements. Regular exercise has been recommended.
                    </p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Hyperlipidemia (High Cholesterol)</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Diagnosed</p>
                      <p className="font-medium">2023</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <p className="font-medium">Being managed with medication</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Current Treatment</p>
                      <p className="font-medium">Atorvastatin 20mg daily</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Last Assessment</p>
                      <p className="font-medium">Feb 15, 2025 (Dr. Amina Benali)</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-1">Notes</p>
                    <p className="text-sm text-gray-600">
                      Total cholesterol and LDL levels remain slightly elevated despite statin therapy. Current levels:
                      Total Cholesterol 210 mg/dL, LDL 130 mg/dL. Dietary modifications have been recommended alongside
                      medication.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Timeline</CardTitle>
              <CardDescription>Chronological overview of significant health events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-gray-200 ml-3 pl-8 space-y-8">
                {[
                  {
                    date: "Apr 12, 2025",
                    title: "Hypertension Follow-up",
                    description:
                      "Blood pressure slightly elevated at 135/85. Lisinopril dosage adjusted. Follow-up scheduled in 2 weeks.",
                  },
                  {
                    date: "Apr 05, 2025",
                    title: "Comprehensive Metabolic Panel",
                    description:
                      "Blood glucose elevated at 142 mg/dL. Kidney and liver function normal. HbA1c at 6.8%.",
                  },
                  {
                    date: "Mar 28, 2025",
                    title: "Diabetes Management",
                    description:
                      "Metformin dosage adjusted based on blood glucose logs. Dietary recommendations provided.",
                  },
                  {
                    date: "Mar 15, 2025",
                    title: "Chest X-Ray",
                    description: "No abnormalities detected. Clear lung fields. Heart size normal.",
                  },
                  {
                    date: "Feb 15, 2025",
                    title: "Annual Checkup",
                    description:
                      "General health assessment. Hypertension and diabetes stable but requiring ongoing management. Lipid panel showed elevated cholesterol.",
                  },
                  {
                    date: "Jan 10, 2025",
                    title: "Abdominal Ultrasound",
                    description:
                      "Liver, gallbladder, pancreas, and spleen appear normal. No masses or abnormalities detected.",
                  },
                  {
                    date: "2023",
                    title: "Type 2 Diabetes Diagnosis",
                    description:
                      "Diagnosed with Type 2 Diabetes. Started on Metformin. Dietary and lifestyle counseling provided.",
                  },
                  {
                    date: "2022",
                    title: "Hypertension Diagnosis",
                    description:
                      "Diagnosed with hypertension. Started on Lisinopril. Advised on sodium reduction and lifestyle modifications.",
                  },
                ].map((event, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-11 mt-1.5 h-4 w-4 rounded-full border-2 border-teal-600 bg-white"></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                      <h3 className="font-medium mt-1">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Recommendations</CardTitle>
              <CardDescription>AI-generated suggestions based on your health data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border-l-4 border-teal-500 bg-teal-50 rounded-r-lg">
                  <h3 className="font-medium">Important Note</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    These recommendations are generated by AI based on your medical records. Always consult with your
                    healthcare provider before making any changes to your treatment plan.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Blood Pressure Management</h3>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>Continue taking Lisinopril as prescribed with the recent dosage adjustment.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>Reduce sodium intake to less than 2,300mg per day (about 1 teaspoon of salt).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>
                          Consider home blood pressure monitoring to track your readings between appointments.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Diabetes Management</h3>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>Continue Metformin as prescribed with the recent dosage adjustment.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>Monitor blood glucose levels daily, ideally before meals and at bedtime.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>Limit carbohydrate intake, especially refined carbohydrates and added sugars.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>Schedule regular foot examinations to check for early signs of diabetic neuropathy.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Lifestyle Recommendations</h3>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>Aim for at least 30 minutes of moderate physical activity most days of the week.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>
                          Follow a Mediterranean-style diet rich in vegetables, fruits, whole grains, and lean proteins.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>
                          Maintain a healthy weight; even a 5-10% weight loss can significantly improve blood glucose
                          and blood pressure.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>Limit alcohol consumption to moderate levels (no more than one drink per day).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>
                          Practice stress management techniques such as deep breathing, meditation, or gentle yoga.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Follow-up Recommendations</h3>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>
                          Attend your scheduled follow-up appointment with Dr. Amina Benali on April 30, 2025.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>Schedule your next HbA1c test within the next 3 months to monitor diabetes control.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-teal-100 p-1 rounded-full mt-0.5">
                          <FileText className="h-3 w-3 text-teal-600" />
                        </div>
                        <span>Consider an annual eye examination to check for diabetic retinopathy.</span>
                      </li>
                    </ul>
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
