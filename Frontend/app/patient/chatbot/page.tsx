"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, Send, FileText, Calendar, Pill } from "lucide-react"

export default function PatientChatbot() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content:
        "Hello Karim, I'm your MediSync health assistant. I can help you understand your medical records and provide health information. How can I assist you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("medical record") || input.toLowerCase().includes("history")) {
        response =
          "I can provide a summary of your medical records. You have hypertension diagnosed in 2022 and type 2 diabetes diagnosed in 2023. Your last visit was on April 12, 2025 with Dr. Amina Benali for a hypertension follow-up. Your blood pressure was slightly elevated at 135/85 mmHg. Would you like more specific information about any of these conditions or visits?"
      } else if (
        input.toLowerCase().includes("medication") ||
        input.toLowerCase().includes("medicine") ||
        input.toLowerCase().includes("drug")
      ) {
        response =
          "You are currently taking three medications: 1) Metformin 500mg twice daily for diabetes, 2) Lisinopril 10mg once daily for hypertension, and 3) Atorvastatin 20mg once daily at bedtime for cholesterol. Your next refill for Metformin is due on May 15, 2025. Is there a specific medication you'd like to know more about?"
      } else if (input.toLowerCase().includes("appointment") || input.toLowerCase().includes("doctor")) {
        response =
          "Your next appointment is scheduled for April 30, 2025 at 14:30 with Dr. Amina Benali. This is a follow-up for your hypertension management. Would you like me to remind you of any preparation needed for this appointment?"
      } else if (input.toLowerCase().includes("blood pressure") || input.toLowerCase().includes("hypertension")) {
        response =
          "Your last blood pressure reading was 135/85 mmHg on April 12, 2025, which is slightly elevated. The target for someone with your conditions is below 130/80 mmHg. Dr. Benali adjusted your Lisinopril dosage during your last visit to help better control your blood pressure. Would you like some tips on managing hypertension?"
      } else if (input.toLowerCase().includes("diabetes") || input.toLowerCase().includes("blood sugar")) {
        response =
          "Your last blood glucose reading was 142 mg/dL and your HbA1c was 6.8%, both slightly above target ranges. Dr. Tazi adjusted your Metformin dosage during your March 28 visit. It's important to continue monitoring your blood glucose levels daily and follow the dietary recommendations provided. Would you like more information about diabetes management?"
      } else {
        response =
          "I'm here to help you understand your health information and medical records. You can ask me about your conditions, medications, upcoming appointments, or recent test results. What would you like to know more about?"
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

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    // Focus the input
    const inputElement = document.getElementById("chat-input")
    if (inputElement) {
      inputElement.focus()
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-teal-50 p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-teal-100 p-2 rounded-full">
            <Brain className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h2 className="font-semibold">MediSync Health Assistant</h2>
            <p className="text-sm text-gray-600">
              Ask me about your medical records, medications, or health information
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className={message.role === "assistant" ? "bg-teal-100" : "bg-gray-100"}>
                <AvatarFallback>
                  {message.role === "assistant" ? <Brain size={18} className="text-teal-600" /> : "KA"}
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
            id="chat-input"
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
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleQuickQuestion("What's in my medical records?")}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Medical Records</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleQuickQuestion("What medications am I taking?")}
          >
            <Pill className="h-3.5 w-3.5" />
            <span>Medications</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleQuickQuestion("When is my next appointment?")}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Appointments</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleQuickQuestion("How can I manage my diabetes better?")}
          >
            <Brain className="h-3.5 w-3.5" />
            <span>Health Tips</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
