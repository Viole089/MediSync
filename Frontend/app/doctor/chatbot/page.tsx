"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, Send, User, Search, Plus } from "lucide-react"

export default function DoctorChatbot() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content:
        "Hello Dr. Amina, how can I help you today? I'm here to provide emotional support and clinical decision assistance.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activePatient, setActivePatient] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [medicalNotes, setMedicalNotes] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const [treatmentPlan, setTreatmentPlan] = useState("")

  const patients = [
    {
      id: "1",
      name: "Karim Benali",
      cin: "AB123456",
      lastVisit: "Apr 12, 2025",
      condition: "Hypertension, Type 2 Diabetes",
    },
    {
      id: "2",
      name: "Fatima Zahra",
      cin: "CD789012",
      lastVisit: "Apr 26, 2025",
      condition: "Pregnancy (2nd trimester)",
    },
    {
      id: "3",
      name: "Youssef El Mansouri",
      cin: "EF345678",
      lastVisit: "Apr 20, 2025",
      condition: "Post-surgical recovery",
    },
  ]

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (
        input.toLowerCase().includes("tired") ||
        input.toLowerCase().includes("exhausted") ||
        input.toLowerCase().includes("burnout")
      ) {
        response =
          "I understand that you're feeling exhausted. The demands of healthcare in Morocco can be overwhelming. Remember that taking care of yourself is just as important as caring for your patients. Would you like some practical self-care strategies that fit into your busy schedule?"
      } else if (
        input.toLowerCase().includes("patient") &&
        (input.toLowerCase().includes("diagnosis") || input.toLowerCase().includes("treatment"))
      ) {
        response =
          "For this clinical question, I'd need more specific patient information. Would you like to securely retrieve a patient record using their CIN, or would you prefer to discuss general treatment guidelines for this condition?"
      } else if (activePatient) {
        response = `Regarding patient ${
          patients.find((p) => p.id === activePatient)?.name
        }, I can help analyze their medical history and suggest potential treatment options. What specific aspect of their care would you like to discuss?`
      } else {
        response =
          "I'm here to support you, both emotionally and with clinical decisions. Would you like to discuss how you're feeling today, or do you have a specific medical case you'd like assistance with?"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
      setInput("")
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const selectPatient = (patientId: string) => {
    setActivePatient(patientId)
    setMessages([
      {
        role: "assistant",
        content: `I've loaded the medical records for ${
          patients.find((p) => p.id === patientId)?.name
        }. How can I assist you with this patient?`,
      },
    ])
  }

  const handleSaveMedicalRecord = () => {
    // In a real app, this would save to a database
    alert("Medical record saved successfully!")

    // Add a message to the chat about the update
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: `I've updated the medical record for ${patients.find((p) => p.id === activePatient)?.name} with new information.`,
      },
    ])

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Thank you for updating the medical record. Is there anything specific about this update you'd like to discuss or analyze?",
        },
      ])
    }, 1000)

    // Clear the form
    setMedicalNotes("")
    setDiagnosis("")
    setTreatmentPlan("")
  }

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Patient List */}
      <div className="w-80 border-r bg-gray-50 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold mb-2">Patient Records</h2>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search patients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={`p-3 border-b cursor-pointer hover:bg-gray-100 ${
                  activePatient === patient.id ? "bg-teal-50 border-l-4 border-l-teal-500" : ""
                }`}
                onClick={() => selectPatient(patient.id)}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{patient.name}</p>
                    <p className="text-xs text-gray-500">CIN: {patient.cin}</p>
                  </div>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  <p>Last visit: {patient.lastVisit}</p>
                  <p className="truncate">{patient.condition}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">No patients found</div>
          )}
        </div>
        <div className="p-3 border-t">
          <Button variant="outline" size="sm" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add New Patient
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="border-b">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="w-full justify-start h-12 px-4 rounded-none border-b">
              <TabsTrigger value="chat" className="data-[state=active]:bg-teal-50">
                AI Assistant
              </TabsTrigger>
              {activePatient && (
                <TabsTrigger value="update" className="data-[state=active]:bg-teal-50">
                  Update Medical History
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="chat" className="flex-1 p-0 m-0">
              {/* Chat Interface */}
              <div className="flex flex-col h-[calc(100vh-112px)]">
                {activePatient && (
                  <div className="bg-teal-50 p-2 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2 px-2">
                      <User className="h-4 w-4 text-teal-600" />
                      <span className="text-sm font-medium">
                        Active Patient: {patients.find((p) => p.id === activePatient)?.name}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setActivePatient(null)}>
                      Clear
                    </Button>
                  </div>
                )}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar className={message.role === "assistant" ? "bg-teal-100" : "bg-gray-100"}>
                          <AvatarFallback>
                            {message.role === "assistant" ? <Brain size={18} className="text-teal-600" /> : "DR"}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-lg p-4 ${
                            message.role === "assistant" ? "bg-teal-50 text-gray-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="bg-teal-100">
                          <AvatarFallback>
                            <Brain size={18} className="text-teal-600" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg p-4 bg-teal-50 text-gray-800">
                          <div className="flex gap-1">
                            <div
                              className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="update" className="p-4 m-0">
              {activePatient && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gray-200 text-gray-700">
                            {patients
                              .find((p) => p.id === activePatient)
                              ?.name.split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="font-semibold">{patients.find((p) => p.id === activePatient)?.name}</h2>
                          <p className="text-sm text-gray-500">
                            CIN: {patients.find((p) => p.id === activePatient)?.cin}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Consultation Notes</h3>
                          <Textarea
                            placeholder="Enter detailed notes about this consultation..."
                            rows={5}
                            value={medicalNotes}
                            onChange={(e) => setMedicalNotes(e.target.value)}
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Diagnosis</h3>
                          <Input
                            placeholder="Enter diagnosis..."
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Treatment Plan</h3>
                          <Textarea
                            placeholder="Describe the treatment plan..."
                            rows={3}
                            value={treatmentPlan}
                            onChange={(e) => setTreatmentPlan(e.target.value)}
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setMedicalNotes("")
                              setDiagnosis("")
                              setTreatmentPlan("")
                            }}
                          >
                            Clear
                          </Button>
                          <Button onClick={handleSaveMedicalRecord}>Save Medical Record</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
