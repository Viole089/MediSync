"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, Send, LogOut } from "lucide-react"
import Link from "next/link"

export default function Chatbot() {
  const searchParams = useSearchParams()
  const userRole = searchParams.get("role") || "patient"
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState(userRole === "doctor" ? "Dr. Amina" : "Karim")

  // Set initial welcome message based on user role
  useEffect(() => {
    if (userRole === "doctor") {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello Dr. Amina, welcome to MediSync AI Assistant. I'm here to provide emotional support and clinical decision assistance. How can I help you today?",
        },
      ])
    } else {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello Karim, welcome to MediSync AI Assistant. I can help you understand your medical records and provide health information. How can I assist you today?",
        },
      ])
    }
  }, [userRole])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (userRole === "doctor") {
        // Doctor-specific responses
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
            "For this clinical question, I'd need more specific patient information. Could you provide more details about the patient's symptoms, medical history, and current condition? This will help me provide more accurate guidance."
        } else if (input.toLowerCase().includes("diabetes") || input.toLowerCase().includes("hypertension")) {
          response =
            "Regarding management of chronic conditions like diabetes and hypertension in Morocco, the latest guidelines emphasize culturally appropriate dietary advice, medication adherence strategies, and regular monitoring. Would you like me to elaborate on any specific aspect of these conditions?"
        } else {
          response =
            "I'm here to support you, both emotionally and with clinical decisions. Would you like to discuss how you're feeling today, or do you have a specific medical case you'd like assistance with?"
        }
      } else {
        // Patient-specific responses
        if (input.toLowerCase().includes("medical record") || input.toLowerCase().includes("history")) {
          response =
            "I can provide a summary of your medical records. You have hypertension diagnosed in 2022 and type 2 diabetes diagnosed in 2023. Your last visit was on April 12, 2025 with Dr. Amina Benali for a hypertension follow-up. Would you like more specific information about any of these conditions or visits?"
        } else if (
          input.toLowerCase().includes("medication") ||
          input.toLowerCase().includes("medicine") ||
          input.toLowerCase().includes("drug")
        ) {
          response =
            "You are currently taking three medications: 1) Metformin 500mg twice daily for diabetes, 2) Lisinopril 10mg once daily for hypertension, and 3) Atorvastatin 20mg once daily at bedtime for cholesterol. Is there a specific medication you'd like to know more about?"
        } else if (input.toLowerCase().includes("appointment") || input.toLowerCase().includes("doctor")) {
          response =
            "Your next appointment is scheduled for April 30, 2025 at 14:30 with Dr. Amina Benali. This is a follow-up for your hypertension management. Would you like me to remind you of any preparation needed for this appointment?"
        } else {
          response =
            "I'm here to help you understand your health information and medical records. You can ask me about your conditions, medications, upcoming appointments, or recent test results. What would you like to know more about?"
        }
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 text-white p-2 rounded-md">
              <Brain size={24} />
            </div>
            <h1 className="text-xl font-bold">MediSync</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-teal-100">
                <AvatarFallback className="text-teal-600">{userRole === "doctor" ? "DR" : "KA"}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline-block">
                {userRole === "doctor" ? "Dr. Amina" : "Karim Benali"}
              </span>
              <span className="text-xs bg-teal-600 px-2 py-0.5 rounded-full">
                {userRole === "doctor" ? "Doctor" : "Patient"}
              </span>
            </div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white">
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden md:inline-block">Logout</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 container mx-auto max-w-4xl flex flex-col p-4">
        <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden border">
          {/* Chat Header */}
          <div className="bg-teal-50 p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <Brain className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h2 className="font-semibold">MediSync AI Assistant</h2>
                <p className="text-sm text-gray-600">
                  {userRole === "doctor"
                    ? "Your personal AI companion for emotional support and clinical decision assistance"
                    : "Ask me about your health, medications, or medical information"}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className={message.role === "assistant" ? "bg-teal-100" : "bg-gray-100"}>
                    <AvatarFallback>
                      {message.role === "assistant" ? (
                        <Brain size={18} className="text-teal-600" />
                      ) : userRole === "doctor" ? (
                        "DR"
                      ) : (
                        "KA"
                      )}
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

          {/* Input Area */}
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
            {userRole === "doctor" ? (
              <div className="mt-2 text-xs text-center text-gray-500">
                Ask about clinical decisions, emotional support, or medical guidelines
              </div>
            ) : (
              <div className="mt-2 text-xs text-center text-gray-500">
                Ask about your health, medications, appointments, or medical records
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
