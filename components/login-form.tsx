"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, ArrowLeft, Eye, EyeOff } from "lucide-react"

interface LoginFormProps {
  onBack: () => void
  onRegister: () => void
}

export default function LoginForm({ onBack, onRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login - in real app, this would call an API
    if (formData.username && formData.password) {
      // Redirect to dashboard
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Shield className="h-12 w-12 text-blue-600 mr-3" />
          <span className="text-3xl font-bold text-gray-900">DigiLocker</span>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
            </div>
            <CardDescription>Enter your credentials to access your digital vault</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username or Email</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username or email"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button variant="link" className="px-0">
                  Forgot password?
                </Button>
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">
                {"Don't have an account? "}
                <Button variant="link" onClick={onRegister} className="px-0">
                  Sign up
                </Button>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
