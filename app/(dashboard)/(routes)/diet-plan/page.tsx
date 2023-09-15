'use client';

import { BrowserRouter as Router } from 'react-router-dom'; 
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { BreakFast } from '@/components/diet-plan/BreakFast';





export default function DashboardPage() {
  return (
    <>
      <div className=" flex-col md:flex">
        <div className="flex-1 space-y-4 pr-5">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Diet Planner</h2>
          </div>
          <Tabs defaultValue="Breakfast" className="space-y-4">
            <TabsList>
              <TabsTrigger value="Breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="Lunch">
                Lunch
              </TabsTrigger>
              <TabsTrigger value="Snacks">
                Snacks
              </TabsTrigger>
              <TabsTrigger value="Dinner">
              Dinner
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Breakfast" className="space-y-4">
              <Router>
               <BreakFast/>
              </Router>
            </TabsContent>
            <TabsContent value="Lunch" className="space-y-4">
            <Router>
               <BreakFast/>
              </Router>
            </TabsContent>
            <TabsContent value="Snacks" className="space-y-4">
            <Router>
               <BreakFast/>
              </Router>
            </TabsContent>
            <TabsContent value="Dinner" className="space-y-4">
            <Router>
               <BreakFast/>
              </Router>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}