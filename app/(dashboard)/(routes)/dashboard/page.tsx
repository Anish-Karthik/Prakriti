'use client';
import { Metadata } from "next"
import { BrowserRouter as Router } from 'react-router-dom'; 
import Link from 'next/link';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


import { Overview_Tab } from "@/components/Overview_Tab/Overview_Tab"
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";



export default function DashboardPage() {
  const router = useRouter();
  const { userId } = useAuth();
  useEffect(() => {
    if (!userId) {
      router.push("/sign-in");
    }
  }, [userId]);

  return (
    <>
      <div className=" flex-col md:flex">
        <div className="flex-1 space-y-4 p-5 ">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <Link href={ "/chatbot"}>
              <Button variant='premium' className='md:text-lg p-4 md:p-6 rounded-full font-semibold'>
              Know your Prakriti now
            </Button>
          </Link>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports">
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications">
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Router>
                <Overview_Tab/>
              </Router>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}