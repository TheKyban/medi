"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function PatientDashboard() {
  const router = useRouter()
  const [symptoms, setSymptoms] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const handleSymptomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!symptoms.trim()) {
      toast.error("Please enter your symptoms")
      return
    }
    
    // Simulate API call to create a diagnosis
    const diagnosisId = Date.now().toString() // In a real app, this would come from your API
    
    toast.success("Symptoms submitted for analysis")
    
    // Redirect to the analysis page after a short delay to allow the toast to be seen
    setTimeout(() => {
      router.push(`/patient/diagnosis/${diagnosisId}`)
    }, 1000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    
    // Simulate file upload process
    setTimeout(() => {
      const newFiles = Array.from(files).map(file => file.name)
      setUploadedFiles(prev => [...prev, ...newFiles])
      setIsUploading(false)
      toast.success(`${files.length} file(s) uploaded successfully`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <Link href="/">
            <Button variant="outline">Logout</Button>
          </Link>
        </div>
        <p className="text-muted-foreground mt-2">Upload your symptoms or medical files for AI diagnosis</p>
      </header>

      <main className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Symptoms</CardTitle>
            <CardDescription>
              Please be as detailed as possible about what you're experiencing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSymptomSubmit} className="space-y-4">
              <Textarea 
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="E.g., I've been experiencing headaches for the past week, particularly in the morning..."
                className="min-h-[200px]"
              />
              <Button type="submit" className="w-full">
                Submit for Analysis
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Medical Files</CardTitle>
            <CardDescription>
              Upload X-rays, lab reports, or other medical documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-muted-foreground"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <p className="text-sm text-muted-foreground font-medium">
                      Drag and drop files here, or click to browse
                    </p>
                  </div>
                </label>
              </div>
              
              {isUploading && (
                <div className="text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
                </div>
              )}

              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Uploaded Files:</h3>
                  <ul className="space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="text-sm bg-secondary p-2 rounded flex justify-between items-center">
                        <span>{file}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                        >
                          ✕
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {uploadedFiles.length > 0 && (
                <Button className="w-full mt-4" onClick={() => {
                  // Simulate API call to create a diagnosis
                  const diagnosisId = Date.now().toString() // In a real app, this would come from your API
                  toast.success("Files submitted for analysis")
                  
                  // Redirect to the analysis page after a short delay
                  setTimeout(() => {
                    router.push(`/patient/diagnosis/${diagnosisId}`)
                  }, 1000)
                }}>
                  Submit Files for Diagnosis
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Diagnoses</CardTitle>
            <CardDescription>
              View your recent AI diagnoses and doctor feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>You don't have any diagnoses yet.</p>
              <p className="text-sm mt-2">Submit your symptoms or upload medical files to get started.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 