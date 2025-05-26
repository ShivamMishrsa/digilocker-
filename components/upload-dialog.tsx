"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, FileText, ImageIcon, LucideFile, CheckCircle, AlertCircle } from "lucide-react"

interface UploadDialogProps {
  onClose: () => void
}

export default function UploadDialog({ onClose }: UploadDialogProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "Identity",
  })

  const categories = ["Identity", "Education", "Employment", "Medical", "Financial", "Others"]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
      if (!formData.name) {
        setFormData({ ...formData, name: e.dataTransfer.files[0].name.split(".")[0] })
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      if (!formData.name) {
        setFormData({ ...formData, name: e.target.files[0].name.split(".")[0] })
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !formData.name) return

    setUploading(true)

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setUploading(false)
    setUploaded(true)

    // Auto close after success
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-green-600" />
    if (file.type === "application/pdf") return <FileText className="h-8 w-8 text-red-600" />
    return <LucideFile className="h-8 w-8 text-gray-600" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (uploaded) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Successful!</h3>
            <p className="text-gray-600">Your document has been uploaded and is being processed.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Upload Document</CardTitle>
              <CardDescription>Add a new document to your digital vault</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : selectedFile
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center">{getFileIcon(selectedFile)}</div>
                <div>
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                </div>
                <Button variant="outline" onClick={() => setSelectedFile(null)}>
                  Choose Different File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drop your file here, or{" "}
                    <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Supports: PDF, JPG, PNG, DOC, DOCX (Max 10MB)</p>
                </div>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="docName">Document Name</Label>
              <Input
                id="docName"
                placeholder="Enter document name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">Security Notice</p>
                <p className="text-blue-700 mt-1">
                  Your documents are encrypted and stored securely. Only you can access your files.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!selectedFile || !formData.name || uploading}>
              {uploading ? "Uploading..." : "Upload Document"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
