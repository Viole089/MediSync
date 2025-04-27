// Central API configuration and utility functions

// Update this to your backend URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// API endpoints based on your backend structure
export const API_ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    ME: `${API_BASE_URL}/api/auth/me`,
  },
  // Patient routes
  PATIENT: {
    MEDICAL_RECORDS: `${API_BASE_URL}/api/patient/medical-records`,
    MEDICATIONS: `${API_BASE_URL}/api/patient/medications`,
    VITALS: `${API_BASE_URL}/api/patient/vitals`,
  },
  // Doctor routes
  DOCTOR: {
    PATIENTS: `${API_BASE_URL}/api/doctor/patients`,
    PATIENT_RECORDS: (patientId: string) => `${API_BASE_URL}/api/doctor/patients/${patientId}/records`,
    PATIENT_MEDICATIONS: (patientId: string) => `${API_BASE_URL}/api/doctor/patients/${patientId}/medications`,
  },
  // Admin routes
  ADMIN: {
    DOCTORS: `${API_BASE_URL}/api/admin/doctors`,
    APPROVE_DOCTOR: (doctorId: string) => `${API_BASE_URL}/api/admin/doctors/${doctorId}/approve`,
    PATIENTS: `${API_BASE_URL}/api/admin/patients`,
  },
}

// Utility function for API requests with authentication
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token")

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  // Handle 401 Unauthorized - token expired or invalid
  if (response.status === 401) {
    localStorage.removeItem("token")
    window.location.href = "/login"
    throw new Error("Session expired. Please log in again.")
  }

  return response
}

// API request helpers
export const api = {
  get: (url: string) => fetchWithAuth(url),

  post: (url: string, data: any) =>
    fetchWithAuth(url, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: (url: string, data: any) =>
    fetchWithAuth(url, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (url: string) =>
    fetchWithAuth(url, {
      method: "DELETE",
    }),
}
