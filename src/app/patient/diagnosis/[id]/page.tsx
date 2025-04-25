"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Avatar } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  User, 
  Download, 
  Share2, 
  ArrowLeft, 
  CalendarClock, 
  FileImage, 
  Stethoscope, 
  Lock,
  PieChart,
  MessageSquare,
  Printer,
  Brain
} from "lucide-react"

// Sample diagnosis data
const diagnosisData = {
  id: "1",
  diagnosisDate: "2023-05-10",
  type: "X-Ray Analysis",
  aiDiagnosis: "Possible pneumonia",
  confidence: 87,
  status: "approved",
  symptoms: "Persistent cough for 10 days, fever, chest pain, difficulty breathing",
  doctorName: "Dr. Sarah Williams",
  doctorFeedback: "I concur with the AI diagnosis. The X-ray shows clear signs of pneumonia in the right lower lobe. I recommend a course of antibiotics (amoxicillin) and rest for at least 5 days. Please schedule a follow-up in one week.",
  imageSrc: "/xray-sample.jpg",
  aiModelData: {
    modelVersion: "MedicalVisionV2.3",
    analysisTimestamp: "2023-05-11T09:43:18Z",
    processingTime: "3.2 seconds",
    featuresAnalyzed: "217 anatomical landmarks detected"
  },
  treatmentRecommendations: [
    "Antibiotics (amoxicillin) for 7 days",
    "Rest for at least 5 days",
    "Increased fluid intake",
    "Follow-up appointment in one week",
    "Monitor symptoms closely, seek immediate care if condition worsens"
  ],
  riskFactors: [
    "Age over 65",
    "History of respiratory conditions",
    "Compromised immune system",
    "Recent exposure to respiratory infections"
  ]
}

export default function PatientDiagnosisDetail() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const [showAIModelDialog, setShowAIModelDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("summary")
  const [question, setQuestion] = useState("")

  const handleShareClick = () => {
    toast.success("Diagnosis shared with your healthcare provider")
  }

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return
    
    toast.success("Question submitted to your doctor")
    setQuestion("")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-950 border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push("/patient/dashboard")}>
              <ArrowLeft size={18} />
            </Button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold">Medical Report #{id}</h1>
                <Badge className={diagnosisData.status === "approved" ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-500" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-500"}>
                  {diagnosisData.status === "approved" ? "Doctor Approved" : "Pending Review"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <CalendarClock className="h-3 w-3" />
                Generated on {diagnosisData.diagnosisDate}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAIModelDialog(true)}>
              <Brain className="h-4 w-4 mr-2" />
              AI Model
            </Button>
            <Button variant="outline" size="sm" onClick={handleShareClick}>
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Printer size={16} className="mr-2" />
              Print
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 w-full justify-start overflow-auto">
            <TabsTrigger value="summary">
              <FileText className="h-4 w-4 mr-2" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="ai-analysis">
              <PieChart className="h-4 w-4 mr-2" />
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="doctor-review">
              <Stethoscope className="h-4 w-4 mr-2" />
              Doctor Review
            </TabsTrigger>
            <TabsTrigger value="images">
              <FileImage className="h-4 w-4 mr-2" />
              Images
            </TabsTrigger>
            <TabsTrigger value="ask">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask Questions
            </TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Diagnosis Summary</CardTitle>
                    <CardDescription>
                      AI-generated diagnosis with doctor verification
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-xl font-medium flex items-center gap-2">
                        {diagnosisData.aiDiagnosis}
                        <Badge variant="outline" className="ml-2 bg-primary/10">
                          {diagnosisData.confidence}% Confidence
                        </Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Based on {diagnosisData.type}
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-primary" />
                          Doctor's Assessment
                        </h4>
                        <p className="text-sm">
                          {diagnosisData.doctorFeedback}
                        </p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Reviewed by {diagnosisData.doctorName}
                        </div>
                      </div>

                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Treatment Recommendations</h4>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          {diagnosisData.treatmentRecommendations.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Uploaded Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md overflow-hidden">
                      <div className="relative aspect-video">
                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-muted-foreground">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <path d="m21 15-5-5L5 21"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="p-3 bg-muted/50">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Chest X-ray</p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded on May 10, 2023
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download size={14} className="mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reported Symptoms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{diagnosisData.symptoms}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Factors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {diagnosisData.riskFactors.map((risk, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Model Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      This diagnosis was generated using advanced machine learning and analyzed with our proprietary medical AI.
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => setShowAIModelDialog(true)}>
                      View AI Model Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="ai-analysis">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>AI Diagnostic Findings</CardTitle>
                  <CardDescription>
                    In-depth analysis by our medical AI system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Primary Diagnosis</h3>
                    <p className="text-sm mt-1">
                      The AI model has identified opacity in the lower right lung that is consistent with pneumonia.
                      This finding has a confidence score of {diagnosisData.confidence}%, indicating high reliability of the diagnosis.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">Analysis Method</h3>
                    <p className="text-sm mt-1">
                      The diagnosis was reached through a combination of image analysis of your chest X-ray and 
                      correlation with your reported symptoms of persistent cough, fever, chest pain, and difficulty breathing.
                    </p>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium">Differential Diagnosis Considerations</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 bg-amber-100 dark:bg-amber-800/20 rounded-full flex items-center justify-center text-xs font-medium text-amber-800 dark:text-amber-400 mt-0.5">
                          23%
                        </div>
                        <div>
                          <div className="font-medium">Bronchitis</div>
                          <p className="text-sm text-muted-foreground">Less likely due to the focal nature of the opacity and fever.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 bg-amber-100 dark:bg-amber-800/20 rounded-full flex items-center justify-center text-xs font-medium text-amber-800 dark:text-amber-400 mt-0.5">
                          18%
                        </div>
                        <div>
                          <div className="font-medium">Pulmonary Edema</div>
                          <p className="text-sm text-muted-foreground">Less likely due to the pattern of infiltrates and absence of cardiac history.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 bg-amber-100 dark:bg-amber-800/20 rounded-full flex items-center justify-center text-xs font-medium text-amber-800 dark:text-amber-400 mt-0.5">
                          12%
                        </div>
                        <div>
                          <div className="font-medium">Lung Cancer</div>
                          <p className="text-sm text-muted-foreground">Low probability given the acute onset and pattern of symptoms.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Image Analysis</CardTitle>
                  <CardDescription>
                    AI detection and visualization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="relative aspect-square">
                      <div className="absolute inset-0 flex items-center justify-center bg-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-muted-foreground">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <path d="m21 15-5-5L5 21"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50">
                      <p className="text-sm font-medium">Chest X-ray with AI heatmap overlay</p>
                      <p className="text-xs text-muted-foreground">
                        Red areas indicate regions of interest for the diagnosis
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Key Findings</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 bg-red-100 dark:bg-red-800/20 rounded-full flex items-center justify-center text-xs font-medium text-red-800 dark:text-red-400 mt-0.5">
                          1
                        </div>
                        <div>
                          <div className="font-medium">Lower Right Lobe Opacity</div>
                          <p className="text-muted-foreground">Consolidated area indicating probable infection</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 bg-amber-100 dark:bg-amber-800/20 rounded-full flex items-center justify-center text-xs font-medium text-amber-800 dark:text-amber-400 mt-0.5">
                          2
                        </div>
                        <div>
                          <div className="font-medium">Minor Bronchial Thickening</div>
                          <p className="text-muted-foreground">Indicative of inflammatory response</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 bg-green-100 dark:bg-green-800/20 rounded-full flex items-center justify-center text-xs font-medium text-green-800 dark:text-green-400 mt-0.5">
                          3
                        </div>
                        <div>
                          <div className="font-medium">Normal Heart Size</div>
                          <p className="text-muted-foreground">No cardiomegaly detected</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Doctor Review Tab */}
          <TabsContent value="doctor-review">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12 border">
                  <User size={32} />
                </Avatar>
                <div>
                  <CardTitle>{diagnosisData.doctorName}</CardTitle>
                  <CardDescription>Board Certified Pulmonologist</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-l-4 border-primary p-4 bg-primary/5 rounded-r-md">
                  <p className="italic">
                    "{diagnosisData.doctorFeedback}"
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-3">Treatment Plan</h3>
                    <ul className="space-y-2">
                      {diagnosisData.treatmentRecommendations.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="h-5 w-5 bg-green-100 dark:bg-green-800/20 rounded-full flex items-center justify-center text-xs font-medium text-green-800 dark:text-green-400 mt-0.5">
                            ✓
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Doctor's Notes</h3>
                    <div className="text-sm space-y-4">
                      <p>
                        Patient presents with classic symptoms of community-acquired pneumonia. 
                        The X-ray confirms the diagnosis, showing a clear infiltrate in the right lower lobe.
                      </p>
                      <p>
                        I'm confident in the AI assessment and have prescribed a standard course of 
                        amoxicillin. Given the patient's age and absence of complicating factors,
                        I expect a full recovery within 2-3 weeks.
                      </p>
                      <p>
                        Follow-up is essential to ensure the infection is clearing properly.
                        If symptoms worsen before the follow-up appointment, please seek immediate care.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6 mt-2">
                  <h3 className="font-medium mb-3">Verified Findings</h3>
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                    <div className="border rounded-md p-3 text-center">
                      <div className="text-lg font-bold text-primary">87%</div>
                      <div className="text-sm text-muted-foreground">AI Accuracy</div>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <div className="text-lg font-bold text-green-600">Confirmed</div>
                      <div className="text-sm text-muted-foreground">Diagnosis Status</div>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <div className="text-lg font-bold text-amber-600">Medium</div>
                      <div className="text-sm text-muted-foreground">Severity</div>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <div className="text-lg font-bold text-blue-600">7 days</div>
                      <div className="text-sm text-muted-foreground">Recovery Time</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Schedule Follow-up Appointment</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Original X-ray Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="relative aspect-square">
                      <div className="absolute inset-0 flex items-center justify-center bg-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-muted-foreground">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <path d="m21 15-5-5L5 21"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Chest X-ray (Original)</p>
                        <p className="text-xs text-muted-foreground">
                          Taken on May 10, 2023
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Analysis Overlay</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="relative aspect-square">
                      <div className="absolute inset-0 flex items-center justify-center bg-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-muted-foreground">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <path d="m21 15-5-5L5 21"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">AI Analysis Heatmap</p>
                        <p className="text-xs text-muted-foreground">
                          Showing areas of concern
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={14} className="mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Image Interpretation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      The chest X-ray shows a focal area of consolidation in the right lower lobe, 
                      which is consistent with pneumonia. The heart size appears normal, and there 
                      are no signs of pleural effusion or pneumothorax.
                    </p>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="border rounded-md p-3">
                        <h4 className="font-medium text-sm mb-1">Areas of Concern</h4>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          <li>Right lower lobe infiltrate</li>
                          <li>Minor bronchial wall thickening</li>
                        </ul>
                      </div>
                      <div className="border rounded-md p-3">
                        <h4 className="font-medium text-sm mb-1">Normal Findings</h4>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          <li>Normal heart size</li>
                          <li>No pleural effusion</li>
                          <li>No pneumothorax</li>
                        </ul>
                      </div>
                      <div className="border rounded-md p-3">
                        <h4 className="font-medium text-sm mb-1">Technical Details</h4>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          <li>PA view</li>
                          <li>Good inspiration</li>
                          <li>Adequate penetration</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ask Questions Tab */}
          <TabsContent value="ask">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Ask Your Doctor</CardTitle>
                    <CardDescription>
                      Have questions about your diagnosis? Ask Dr. Sarah Williams directly.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleQuestionSubmit} className="space-y-4">
                      <Textarea 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="e.g., How long should I take the antibiotics? Are there any side effects I should watch for?"
                        className="min-h-[150px]"
                      />
                      <div className="flex justify-end">
                        <Button type="submit" disabled={!question.trim()}>
                          Send Question
                        </Button>
                      </div>
                    </form>
                    <div className="mt-6 border-t pt-6">
                      <h3 className="font-medium mb-3">Frequently Asked Questions</h3>
                      <div className="space-y-4">
                        <div className="border rounded-md p-3">
                          <h4 className="font-medium text-sm">How contagious is pneumonia?</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Bacterial pneumonia like yours is not highly contagious, but it's still advisable to
                            cover your cough and practice good hand hygiene to protect others.
                          </p>
                        </div>
                        <div className="border rounded-md p-3">
                          <h4 className="font-medium text-sm">When should I start feeling better?</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Most patients begin to feel improvement within 48-72 hours of starting antibiotics.
                            However, complete recovery may take 1-3 weeks depending on severity.
                          </p>
                        </div>
                        <div className="border rounded-md p-3">
                          <h4 className="font-medium text-sm">What if my symptoms get worse?</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            If you experience increased difficulty breathing, persistent high fever, or
                            worsening symptoms after 2-3 days of antibiotics, seek immediate medical attention.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium text-sm">Pneumonia Care Guide</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Detailed information about managing pneumonia at home
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-1 text-sm">
                        Download PDF
                      </Button>
                    </div>
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium text-sm">Medication Information</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Learn about amoxicillin and potential side effects
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-1 text-sm">
                        View Details
                      </Button>
                    </div>
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium text-sm">Breathing Exercises</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Simple exercises to help clear your lungs
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-1 text-sm">
                        Watch Video
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Browse All Resources
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        1
                      </div>
                      <div className="text-sm">Fill your prescription for amoxicillin</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        2
                      </div>
                      <div className="text-sm">Take medication as prescribed</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        3
                      </div>
                      <div className="text-sm">Rest and stay hydrated</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        4
                      </div>
                      <div className="text-sm">Schedule follow-up appointment in 7 days</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Schedule Follow-up</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showAIModelDialog} onOpenChange={setShowAIModelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>AI Model Information</DialogTitle>
            <DialogDescription>
              Technical details about the AI analysis of your diagnosis
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="col-span-1 font-medium text-muted-foreground">Model</div>
              <div className="col-span-3">
                {diagnosisData.aiModelData.modelVersion}
              </div>
              
              <div className="col-span-1 font-medium text-muted-foreground">Analysis Time</div>
              <div className="col-span-3">
                {diagnosisData.aiModelData.analysisTimestamp}
              </div>
              
              <div className="col-span-1 font-medium text-muted-foreground">Processing</div>
              <div className="col-span-3">
                {diagnosisData.aiModelData.processingTime}
              </div>
              
              <div className="col-span-1 font-medium text-muted-foreground">Features</div>
              <div className="col-span-3">
                {diagnosisData.aiModelData.featuresAnalyzed}
              </div>
            </div>
            
            <div className="bg-muted p-3 rounded-md">
              <p className="text-xs text-muted-foreground">
                Our AI model is trained on over 1 million anonymized medical images and continuously improved 
                by our team of expert radiologists and machine learning engineers.
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <div className="flex items-center text-xs text-muted-foreground">
              <Lock className="h-3 w-3 mr-1" />
              Analysis secured with encryption
            </div>
            <Button variant="outline" onClick={() => setShowAIModelDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 