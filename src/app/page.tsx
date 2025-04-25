import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Medi</CardTitle>
          <CardDescription className="text-center">
            AI-Powered Medical Diagnosis Platform
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
            Protected by blockchain technology for secure medical data
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
