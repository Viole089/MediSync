import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Brain, ClipboardList } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 text-white p-2 rounded-md">
              <Brain size={24} />
            </div>
            <h1 className="text-2xl font-bold text-teal-600">MediSync</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-600 hover:text-teal-600">
              Features
            </Link>
            <Link href="#for-doctors" className="text-gray-600 hover:text-teal-600">
              For Doctors
            </Link>
            <Link href="#for-patients" className="text-gray-600 hover:text-teal-600">
              For Patients
            </Link>
            <Link href="#security" className="text-gray-600 hover:text-teal-600">
              Security
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-teal-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  AI-Powered Healthcare for Morocco
                </h1>
                <p className="text-xl text-gray-600">
                  MediSync combines emotional support for doctors with secure patient record management to transform
                  healthcare delivery in Morocco.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup?role=doctor">
                    <Button size="lg" className="w-full sm:w-auto">
                      For Doctors
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/signup?role=patient">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      For Patients
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="MediSync Platform"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why MediSync is Unique</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform addresses the critical challenges facing Morocco's healthcare system
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-teal-100 p-3 rounded-full w-fit mb-6">
                  <Brain className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Support</h3>
                <p className="text-gray-600">
                  Combines soft-skills-enhanced LLM interaction with clinical decision support to reduce burnout and
                  improve outcomes.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-teal-100 p-3 rounded-full w-fit mb-6">
                  <Shield className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Security</h3>
                <p className="text-gray-600">
                  Decentralized encryption and CIN-based deterministic key derivation ensuring privacy and data
                  sovereignty.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-teal-100 p-3 rounded-full w-fit mb-6">
                  <ClipboardList className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Structured Records</h3>
                <p className="text-gray-600">
                  Organized patient data management with secure CIN-based retrieval and summarization for better
                  continuity of care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Doctors Section */}
        <section id="for-doctors" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Doctor Experience"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">For Doctors</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-100 p-1 rounded-full mt-1">
                      <ArrowRight className="h-4 w-4 text-teal-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Emotional Support:</span> An intelligent agent
                      providing empathy and recognition to reduce burnout.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-100 p-1 rounded-full mt-1">
                      <ArrowRight className="h-4 w-4 text-teal-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Clinical Decision Support:</span> AI assistance for
                      better clinical outcomes and treatment plans.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-100 p-1 rounded-full mt-1">
                      <ArrowRight className="h-4 w-4 text-teal-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Secure Patient Records:</span> Access to patient
                      diagnostic summaries via secure CIN-based retrieval.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-100 p-1 rounded-full mt-1">
                      <ArrowRight className="h-4 w-4 text-teal-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Efficient Management:</span> Organize and showcase
                      patient records with ease.
                    </p>
                  </li>
                </ul>
                <Link href="/signup?role=doctor">
                  <Button size="lg">
                    Join as a Doctor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* For Patients Section */}
        <section id="for-patients" className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Patient Experience"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">For Patients</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-100 p-1 rounded-full mt-1">
                      <ArrowRight className="h-4 w-4 text-teal-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Better Treatments:</span> Benefit from improved
                      clinical decisions leading to higher patient satisfaction.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-100 p-1 rounded-full mt-1">
                      <ArrowRight className="h-4 w-4 text-teal-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Personal Health Records:</span> Access your own
                      summarized medical history anytime, anywhere.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-100 p-1 rounded-full mt-1">
                      <ArrowRight className="h-4 w-4 text-teal-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Enhanced Privacy:</span> Your data is encrypted and
                      only accessible to you and authorized healthcare providers.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-teal-100 p-1 rounded-full mt-1">
                      <ArrowRight className="h-4 w-4 text-teal-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Healthcare Awareness:</span> Better understand your
                      medical history and treatment plans.
                    </p>
                  </li>
                </ul>
                <Link href="/signup?role=patient">
                  <Button size="lg">
                    Join as a Patient
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Security & Privacy</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                MediSync prioritizes the security and privacy of all healthcare data with advanced encryption and strict
                access controls
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Doctor Side Security</h3>
                <img
                  src="/placeholder.svg?height=250&width=500"
                  alt="Doctor Security Flow"
                  className="rounded-lg shadow mb-6"
                />
                <p className="text-gray-600">
                  Doctors benefit from privileged access to patient data, safeguarded by encrypted retrieval and strict
                  identity verification protocols, ensuring both clinical efficiency and absolute confidentiality.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Patient Side Security</h3>
                <img
                  src="/placeholder.svg?height=250&width=500"
                  alt="Patient Security Flow"
                  className="rounded-lg shadow mb-6"
                />
                <p className="text-gray-600">
                  Patients maintain exclusive access to their own health summaries, with data encrypted end-to-end to
                  guarantee personal control and privacy at every interaction.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-teal-600 text-white p-2 rounded-md">
                  <Brain size={24} />
                </div>
                <h2 className="text-xl font-bold text-white">MediSync</h2>
              </div>
              <p className="text-gray-400">
                AI-powered healthcare platform for Morocco, enhancing doctor support and patient care.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-teal-400">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#for-doctors" className="text-gray-400 hover:text-teal-400">
                    For Doctors
                  </Link>
                </li>
                <li>
                  <Link href="#for-patients" className="text-gray-400 hover:text-teal-400">
                    For Patients
                  </Link>
                </li>
                <li>
                  <Link href="#security" className="text-gray-400 hover:text-teal-400">
                    Security
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-teal-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-teal-400">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-teal-400">
                    CNDP Compliance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-teal-400">
                    Data Protection
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: contact@medisync.ma</li>
                <li className="text-gray-400">Phone: +212 522 123 456</li>
                <li className="text-gray-400">Casablanca, Morocco</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} MediSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
