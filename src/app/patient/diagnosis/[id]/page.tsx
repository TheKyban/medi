"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"

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
  blockchainData: {
    transactionId: "0x8fc6a189abf2c1e4f424dab12e3993021c4b4e5d6f7890123456789abcdef",
    timestamp: "2023-05-11T09:43:18Z",
    aiModelVersion: "MedicalVisionV2.3",
    dataHash: "0xac76e1b2c3d4e5f67890123456789abcdef1234567890abcdef12345678901"
  }
}

export default function PatientDiagnosisDetail() {
  const params = useParams()
  const { id } = params
  const [showBlockchainDialog, setShowBlockchainDialog] = useState(false)

  const handleShareClick = () => {
    toast.success("Diagnosis shared with your healthcare provider")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4">
          <Link href="/patient/dashboard">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Diagnosis Report #{id}</h1>
              <Badge className={diagnosisData.status === "approved" ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-500" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-500"}>
                {diagnosisData.status === "approved" ? "Approved by Doctor" : "Pending Review"}
              </Badge>
            </div>
            <p className="text-muted-foreground">Generated on {diagnosisData.diagnosisDate}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    This diagnosis is supported by your symptoms of persistent cough, fever, and difficulty breathing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Doctor's Feedback</CardTitle>
              <CardDescription>
                {diagnosisData.doctorName} reviewed your diagnosis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {diagnosisData.doctorFeedback ? (
                <div className="space-y-4">
                  <p className="text-sm border-l-4 border-primary pl-4 py-2">
                    {diagnosisData.doctorFeedback}
                  </p>
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="text-sm font-medium mb-2">Treatment Recommendations:</h3>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Antibiotics (amoxicillin)</li>
                      <li>Rest for at least 5 days</li>
                      <li>Follow-up appointment in one week</li>
                      <li>Stay hydrated and monitor symptoms</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No doctor feedback yet.</p>
                  <p className="text-sm mt-2">A doctor will review your diagnosis soon.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Reported Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{diagnosisData.symptoms}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Security & Verification</CardTitle>
            <CardDescription>
              Your medical data is securely stored and verifiable on blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium">Encrypted & Immutable</h3>
                <p className="text-xs text-muted-foreground">Your diagnosis data cannot be altered or tampered with</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium">Access Control</h3>
                <p className="text-xs text-muted-foreground">Only you and authorized healthcare providers can access your data</p>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-2" onClick={() => setShowBlockchainDialog(true)}>
              View Blockchain Verification
            </Button>
          </CardContent>
          <CardFooter>
            <Button onClick={handleShareClick} className="w-full">
              Share with Healthcare Provider
            </Button>
          </CardFooter>
        </Card>
      </main>

      <Dialog open={showBlockchainDialog} onOpenChange={setShowBlockchainDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Blockchain Verification</DialogTitle>
            <DialogDescription>
              This diagnosis has been securely recorded on the blockchain
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="col-span-1 font-medium text-muted-foreground">Transaction</div>
              <div className="col-span-3 font-mono overflow-hidden text-ellipsis">
                {diagnosisData.blockchainData.transactionId}
              </div>
              
              <div className="col-span-1 font-medium text-muted-foreground">Timestamp</div>
              <div className="col-span-3">
                {diagnosisData.blockchainData.timestamp}
              </div>
              
              <div className="col-span-1 font-medium text-muted-foreground">AI Model</div>
              <div className="col-span-3">
                {diagnosisData.blockchainData.aiModelVersion}
              </div>
              
              <div className="col-span-1 font-medium text-muted-foreground">Data Hash</div>
              <div className="col-span-3 font-mono text-xs overflow-hidden text-ellipsis">
                {diagnosisData.blockchainData.dataHash}
              </div>
            </div>
            
            <div className="bg-muted p-3 rounded-md">
              <p className="text-xs text-muted-foreground">
                This data is stored on the Polygon blockchain and can be independently verified.
                The hash proves that your medical data hasn't been altered since it was recorded.
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={() => setShowBlockchainDialog(false)}>
              Close
            </Button>
            <Button variant="secondary">
              Verify on Etherscan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 