"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, FileText, Cloud, Lock } from "lucide-react"
import LoginForm from "@/components/login-form"
import RegisterForm from "@/components/register-form"

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  if (showLogin) {
    return (
      <LoginForm
        onBack={() => setShowLogin(false)}
        onRegister={() => {
          setShowLogin(false)
          setShowRegister(true)
        }}
      />
    )
  }

  if (showRegister) {
    return (
      <RegisterForm
        onBack={() => setShowRegister(false)}
        onLogin={() => {
          setShowRegister(false)
          setShowLogin(true)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DigiLocker</span>
            </div>
            <div className="space-x-4">
              <Button variant="outline" onClick={() => setShowLogin(true)}>
                Login
              </Button>
              <Button onClick={() => setShowRegister(true)}>Register</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Digital Document
              <span className="text-blue-600"> Vault</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Store, manage, and access all your important documents securely in one place. Government-grade security
              with user-friendly interface.
            </p>
            <div className="space-x-4">
              <Button size="lg" onClick={() => setShowRegister(true)}>
                Get Started Free
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose DigiLocker?</h2>
            <p className="text-lg text-gray-600">Secure, convenient, and always accessible</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Lock className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Bank-Level Security</CardTitle>
                <CardDescription>
                  Your documents are encrypted and stored with military-grade security protocols
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Cloud className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Cloud Storage</CardTitle>
                <CardDescription>
                  Access your documents from anywhere, anytime, on any device with internet connection
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Document Management</CardTitle>
                <CardDescription>
                  Organize, categorize, and search through your documents with powerful tools
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Documents Stored</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-xl font-bold">DigiLocker</span>
              </div>
              <p className="text-gray-400">Secure digital document storage for everyone.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Security</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Status</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DigiLocker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
