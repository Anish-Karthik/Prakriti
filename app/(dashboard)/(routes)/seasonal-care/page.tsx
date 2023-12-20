"use client"

import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ActionAreaCard from "@/components/ImageCard/ActionAreaCard"

import { Autumn } from "./Autumn"
import { Monsoon } from "./Monsoon"
import { Summer } from "./Summer"
import { Winter } from "./Winter"

const Page = () => {
  return (
    <div className="w-screen p-2 absolute lg:pr-[18rem]  flex justify-center ">
      <div className="grid gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  ">
        <Tabs defaultValue="summer" className="space-y-4 col-span-2">
          <TabsList className="w-full justify-between">
            <TabsTrigger value="summer">Summer</TabsTrigger>
            <TabsTrigger value="monsoon">Monsoon</TabsTrigger>
            <TabsTrigger value="autumn">Autumn</TabsTrigger>
            <TabsTrigger value="winter">Winter</TabsTrigger>
          </TabsList>
          <TabsContent value="summer" className="space-y-4">
            <Router>
              <Summer />
            </Router>
          </TabsContent>
          <TabsContent value="monsoon" className="space-y-4">
            <Router>
              <Monsoon />
            </Router>
          </TabsContent>
          <TabsContent value="autumn" className="space-y-4">
            <Router>
              <Autumn />
            </Router>
          </TabsContent>
          <TabsContent value="winter" className="space-y-4">
            <Router>
              <Winter />
            </Router>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Page
