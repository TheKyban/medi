"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// Sample diagnosis data
const diagnosisData = {
  id: "1",
  patientName: "John Doe",
  patientAge: 45,
  patientGender: "Male",
  dateSubmitted: "2023-05-10",
  type: "X-Ray Analysis",
  aiDiagnosis: "Possible pneumonia",
  confidence: 87,
  status: "pending",
  symptoms: "Persistent cough for 10 days, fever, chest pain, difficulty breathing",
  medicalHistory: "Smoker (15 years), previous bronchitis (2020)",
  imageSrc: "/xray-sample.jpg"
}

export default function DiagnosisDetail() {
  const params = useParams()
  const { id } = params
  const [feedback, setFeedback] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [dialogAction, setDialogAction] = useState<"approve" | "reject">("approve")

  const handleAction = (action: "approve" | "reject") => {
    setDialogAction(action)
    setShowConfirmDialog(true)
  }

  const confirmAction = () => {
    if (dialogAction === "approve") {
      toast.success("Diagnosis approved and feedback sent to patient")
    } else {
      toast.success("Diagnosis rejected with your feedback")
    }
    setShowConfirmDialog(false)
    // In a real app, we would then redirect back to the dashboard
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4">
          <Link href="/doctor/dashboard">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Diagnosis Review #{id}</h1>
            <p className="text-muted-foreground">Patient: {diagnosisData.patientName}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                  <dd className="mt-1">{diagnosisData.patientName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Age</dt>
                  <dd className="mt-1">{diagnosisData.patientAge}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Gender</dt>
                  <dd className="mt-1">{diagnosisData.patientGender}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Date Submitted</dt>
                  <dd className="mt-1">{diagnosisData.dateSubmitted}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Symptoms & Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Reported Symptoms</h3>
                  <p>{diagnosisData.symptoms}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Medical History</h3>
                  <p>{diagnosisData.medicalHistory}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Diagnosis</CardTitle>
                <Badge className="bg-primary/20 text-primary">
                  {diagnosisData.confidence}% Confidence
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium">{diagnosisData.aiDiagnosis}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on {diagnosisData.type}
                  </p>
                </div>
                <div className="rounded-lg border overflow-hidden">
                  <div className="relative aspect-video">
                    {/* In a real app, this would be a real image from the database */}
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
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">AI Explanation</h3>
                  <p className="text-sm">
                    The model identified opacity in the lower right lung that is consistent with pneumonia.
                    This diagnosis is supported by the patient's symptoms of persistent cough, fever, and difficulty breathing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Medical Opinion</CardTitle>
              <CardDescription>
                Provide your feedback on the AI diagnosis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter your medical opinion and any treatment recommendations..."
                className="min-h-[150px]"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleAction("reject")}>
                Reject Diagnosis
              </Button>
              <Button onClick={() => handleAction("approve")}>
                Approve Diagnosis
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction === "approve" ? "Approve Diagnosis" : "Reject Diagnosis"}
            </DialogTitle>
            <DialogDescription>
              {dialogAction === "approve" 
                ? "Are you sure you want to approve this AI diagnosis?" 
                : "Are you sure you want to reject this AI diagnosis?"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              Your feedback will be recorded on the blockchain and shared with the patient.
            </p>
            {feedback ? (
              <div className="mt-2 p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">Your feedback:</p>
                <p className="text-sm mt-1">{feedback}</p>
              </div>
            ) : (
              <p className="text-sm text-yellow-500 mt-2">
                Warning: You haven't provided any feedback yet.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant={dialogAction === "approve" ? "default" : "destructive"}
              onClick={confirmAction}
            >
              Confirm {dialogAction === "approve" ? "Approval" : "Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 