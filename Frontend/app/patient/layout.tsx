import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, LayoutDashboard, FileText, MessageSquare, Settings, LogOut } from "lucide-react"

export default function PatientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white md:min-h-screen">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-teal-600 text-white p-2 rounded-md">
              <Brain size={24} />
            </div>
            <h1 className="text-xl font-bold">MediSync</h1>
          </div>

          <nav className="space-y-1">
            <Link href="/patient/dashboard">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/patient/records">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <FileText className="mr-2 h-5 w-5" />
                My Records
              </Button>
            </Link>
            <Link href="/patient/chatbot">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <MessageSquare className="mr-2 h-5 w-5" />
                Health Assistant
              </Button>
            </Link>
            <Link href="/patient/settings">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-gray-800">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  )
}
