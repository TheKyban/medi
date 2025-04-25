"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  UploadCloud, 
  X, 
  FileText, 
  BarChart, 
  History, 
  User, 
  Calendar,
  FilePlus2,
  FileImage,
  Stethoscope,
  AlertCircle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function PatientDashboard() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("upload")
  const [symptoms, setSymptoms] = useState("")
  
  // Sample past diagnoses
  const pastDiagnoses = [
    {id: "1", title: "Chest pain and shortness of breath", date: "May 15, 2023", status: "Confirmed", doctor: "Dr. Sarah Williams"},
    {id: "2", title: "Recurring migraine headaches", date: "Jun 22, 2023", status: "Pending Review", doctor: "Awaiting doctor review"},
  ]

  const handleSymptomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!symptoms.trim()) {
      toast.error("Please describe your symptoms")
      return
    }
    
    toast.success("Symptoms submitted for analysis")
    
    // Redirect to a new diagnosis
    setTimeout(() => {
      router.push(`/patient/diagnosis/3`)
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

  const handleFilesSubmit = () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one medical report")
      return
    }
    
    toast.success("Medical reports submitted for analysis")
    
    // Redirect to a new diagnosis
    setTimeout(() => {
      router.push(`/patient/diagnosis/3`)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-950 border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">MediBox</h1>
            <nav className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="text-primary font-medium">Dashboard</Button>
              <Button variant="ghost" size="sm">Reports</Button>
              <Button variant="ghost" size="sm">History</Button>
              <Button variant="ghost" size="sm">Settings</Button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <Avatar>
                <User size={20} />
              </Avatar>
              <div className="text-sm">
                <div>John Smith</div>
                <div className="text-xs text-muted-foreground">Patient</div>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">Logout</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Welcome back, John</h2>
          <p className="text-muted-foreground">Upload medical reports or describe your symptoms for AI analysis</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Work Area - Takes 2/3 of the grid on desktop */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get Medical Analysis</CardTitle>
                <CardDescription>Upload reports or describe symptoms for AI diagnosis</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="upload">
                      <FileImage className="h-4 w-4 mr-2" />
                      Upload Reports
                    </TabsTrigger>
                    <TabsTrigger value="symptoms">
                      <Stethoscope className="h-4 w-4 mr-2" />
                      Describe Symptoms
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer block text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <UploadCloud className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium">Upload Medical Reports</h3>
                          <p className="text-sm text-muted-foreground max-w-md mx-auto">
                            Drag and drop your medical files here, or click to browse. 
                            We accept X-rays, MRIs, CT scans, lab reports, and other medical documents.
                          </p>
                          <Button size="sm" className="mt-2">Select Files</Button>
                        </div>
                      </label>
                    </div>
                    
                    {isUploading && (
                      <div className="p-4 bg-muted rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                          <div>
                            <h4 className="font-medium">Uploading files...</h4>
                            <p className="text-sm text-muted-foreground">Your files are being securely uploaded</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium">Uploaded files</h4>
                        <div className="border rounded-md divide-y">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="p-3 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded">
                                  <FileText className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{file}</p>
                                  <p className="text-xs text-muted-foreground">Uploaded just now</p>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button onClick={handleFilesSubmit}>Submit for Analysis</Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="border-t pt-4 mt-6">
                      <h4 className="font-medium mb-2">Supported report types</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 border rounded-md text-center">
                          <FileImage className="h-5 w-5 text-primary mx-auto mb-1" />
                          <span className="text-sm">X-rays & Scans</span>
                        </div>
                        <div className="p-3 border rounded-md text-center">
                          <BarChart className="h-5 w-5 text-primary mx-auto mb-1" />
                          <span className="text-sm">Lab Reports</span>
                        </div>
                        <div className="p-3 border rounded-md text-center">
                          <FileText className="h-5 w-5 text-primary mx-auto mb-1" />
                          <span className="text-sm">Doctor's Notes</span>
                        </div>
                        <div className="p-3 border rounded-md text-center">
                          <FilePlus2 className="h-5 w-5 text-primary mx-auto mb-1" />
                          <span className="text-sm">Prescriptions</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="symptoms">
                    <form onSubmit={handleSymptomSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="font-medium" htmlFor="symptoms">Describe your symptoms in detail</label>
                        <Textarea 
                          id="symptoms"
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                          placeholder="Please describe what you're experiencing, including when it started, severity, any triggers, etc."
                          className="min-h-[200px]"
                        />
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                        <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium">For better analysis, include:</p>
                          <ul className="mt-1 space-y-1 list-disc list-inside text-muted-foreground">
                            <li>Duration of symptoms</li>
                            <li>Time of day when symptoms are worse</li>
                            <li>Any medications you're taking</li>
                            <li>Previous medical conditions</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit">Submit for Analysis</Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Diagnoses</CardTitle>
                <CardDescription>Your previous medical analyses and results</CardDescription>
              </CardHeader>
              <CardContent>
                {pastDiagnoses.length > 0 ? (
                  <div className="space-y-4">
                    {pastDiagnoses.map((item) => (
                      <div key={item.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {item.date}
                            </div>
                          </div>
                          <Badge className={item.status === "Confirmed" ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-500" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-500"}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="text-sm">{item.doctor}</div>
                        <div className="mt-3 flex justify-end">
                          <Button variant="outline" size="sm" onClick={() => router.push(`/patient/diagnosis/${item.id}`)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>You don't have any diagnoses yet.</p>
                    <p className="text-sm mt-2">Submit medical reports or describe your symptoms to get started.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar - Takes 1/3 of the grid on desktop */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <User size={40} />
                  </Avatar>
                  <h3 className="font-bold text-lg">John Smith</h3>
                  <p className="text-sm text-muted-foreground mb-4">Patient ID: P-23045</p>
                  
                  <div className="w-full border-t pt-4 mt-2">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-muted-foreground">Age</div>
                      <div className="font-medium text-right">42</div>
                      
                      <div className="text-muted-foreground">Blood Type</div>
                      <div className="font-medium text-right">A+</div>
                      
                      <div className="text-muted-foreground">Primary Doctor</div>
                      <div className="font-medium text-right">Dr. Williams</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" size="sm">Edit Profile</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
                <CardDescription>Your medical data is protected</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">End-to-end Encryption</h4>
                    <p className="text-sm text-muted-foreground">Your medical data is encrypted in transit and at rest</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Advanced AI Protection</h4>
                    <p className="text-sm text-muted-foreground">Machine learning algorithms detect and prevent unauthorized access</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Dr. Sarah Williams</h4>
                    <Badge variant="outline">Upcoming</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      May 28, 2023 - 10:30 AM
                    </div>
                    <div className="mt-1">Follow-up for pneumonia diagnosis</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Appointments</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 