import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, LockKeyhole, Bot, BadgeCheck, MessageSquare, Cpu } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="border-b bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MediBox</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              How it works
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              About us
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">Sign up</Button>
            <Button variant="default" size="sm">Login</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center py-12 md:py-20">
          <div className="flex-1 space-y-6 md:pr-12 pb-8 md:pb-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              AI-Powered Medical <span className="text-primary">Diagnosis</span> and <span className="text-primary">Consultation</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 md:max-w-xl">
              Get instant medical insights, secure diagnoses, and expert verification from healthcare professionals, all in one platform.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-primary/10 p-1 rounded-full">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Doctor-verified results</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    AI diagnoses are reviewed by qualified medical professionals
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-primary/10 p-1 rounded-full">
                  <LockKeyhole className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Advanced security</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your medical records are encrypted and protected
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-primary/10 p-1 rounded-full">
                  <Cpu className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Advanced ML analysis</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    State-of-the-art models trained on extensive medical data
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4 flex space-x-4">
              <Link href="/patient/dashboard">
                <Button size="lg" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Start medical analysis
                </Button>
              </Link>
              <Button variant="outline" size="lg">Learn more</Button>
            </div>
          </div>

          <div className="flex-1">
            <Card className="shadow-xl border-primary/20">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">MediBox AI</CardTitle>
                <CardDescription className="text-center">
                  Access your secure healthcare platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="patient" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="patient">Patient</TabsTrigger>
                    <TabsTrigger value="doctor">Doctor</TabsTrigger>
                  </TabsList>
                  <TabsContent value="patient">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="Enter your username" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" />
                      </div>
                      <Link href="/patient/dashboard" className="w-full">
                        <Button className="w-full">Login as Patient</Button>
                      </Link>
                    </div>
                  </TabsContent>
                  <TabsContent value="doctor">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor-username">Username</Label>
                        <Input id="doctor-username" placeholder="Enter your username" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doctor-password">Password</Label>
                        <Input id="doctor-password" type="password" placeholder="Enter your password" />
                      </div>
                      <Link href="/doctor/dashboard" className="w-full">
                        <Button className="w-full">Login as Doctor</Button>
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-muted-foreground text-center">
                  Don't have an account? <Link href="#" className="text-primary hover:underline">Sign up</Link>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  Secured with advanced encryption for your medical data
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <BrainCircuit className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">MediBox</span>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            © 2023 MediBox. All rights reserved. 
            <span className="mx-2">·</span>
            <a href="#" className="hover:text-primary">Privacy</a>
            <span className="mx-2">·</span>
            <a href="#" className="hover:text-primary">Terms</a>
            <span className="mx-2">·</span>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
