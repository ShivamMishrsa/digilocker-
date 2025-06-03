"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  FileText,
  Search,
  Download,
  Trash2,
  Eye,
  User,
  LogOut,
  Plus,
  Grid,
  List,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import UploadDialog from "@/components/upload-dialog"

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showUpload, setShowUpload] = useState(false)

  // Mock data
  const user = {
    name: "Shivam",
    email: "shivam@example.com",
    documentsCount: 12,
    storageUsed: "45.2 MB",
    storageLimit: "1 GB",
  }

  const documents = [
    {
      id: 1,
      name: "Aadhaar Card",
      type: "pdf",
      category: "Identity",
      size: "2.1 MB",
      uploadDate: "2024-01-15",
      verified: true,
    },
    {
      id: 2,
      name: "PAN Card",
      type: "pdf",
      category: "Identity",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      verified: true,
    },
    {
      id: 3,
      name: "Degree Certificate",
      type: "pdf",
      category: "Education",
      size: "3.2 MB",
      uploadDate: "2024-01-12",
      verified: false,
    },
    {
      id: 4,
      name: "Bank Statement",
      type: "pdf",
      category: "Financial",
      size: "1.5 MB",
      uploadDate: "2024-01-10",
      verified: true,
    },
    {
      id: 5,
      name: "Passport",
      type: "pdf",
      category: "Identity",
      size: "2.8 MB",
      uploadDate: "2024-01-08",
      verified: true,
    },
    {
      id: 6,
      name: "Medical Report",
      type: "pdf",
      category: "Medical",
      size: "4.1 MB",
      uploadDate: "2024-01-05",
      verified: false,
    },
  ]

  const categories = ["all", "Identity", "Education", "Financial", "Medical", "Employment", "Others"]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLogout = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DigiLocker</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Manage your digital documents securely and efficiently.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-900">{user.documentsCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-gray-900">{documents.filter((d) => d.verified).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{documents.filter((d) => !d.verified).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Storage Used</p>
                  <p className="text-2xl font-bold text-gray-900">{user.storageUsed}</p>
                  <p className="text-xs text-gray-500">of {user.storageLimit}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <Button onClick={() => setShowUpload(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Documents Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">{doc.name}</CardTitle>
                    </div>
                    <Badge variant={doc.verified ? "default" : "secondary"}>
                      {doc.verified ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>{doc.category}</span>
                      <span>{doc.size}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {doc.uploadDate}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Upload Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                              <div className="text-sm text-gray-500">{doc.type.toUpperCase()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.uploadDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={doc.verified ? "default" : "secondary"}>
                            {doc.verified ? "Verified" : "Pending"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Upload your first document to get started."}
            </p>
            <Button onClick={() => setShowUpload(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        )}
      </div>

      {showUpload && <UploadDialog onClose={() => setShowUpload(false)} />}
    </div>
  )
}
