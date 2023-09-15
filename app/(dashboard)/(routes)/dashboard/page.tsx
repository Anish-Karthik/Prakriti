'use client';
import { Metadata } from "next"
import { BrowserRouter as Router } from 'react-router-dom'; 
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


import { Overview_Tab } from "@/components/Overview_Tab/Overview_Tab"



export default function DashboardPage() {
  return (
    <>
      <div className=" flex-col md:flex">
        <div className="flex-1 space-y-4 p-5 ">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
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