'use client';
import ActionAreaCard from '@/components/ImageCard/ActionAreaCard';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { BrowserRouter as Router } from 'react-router-dom'; 
import React from 'react';
import { Summer } from './Summer';
import { Monsoon } from './Monsoon';
import { Autumn } from './Autumn';
import { Winter } from './Winter';

const Page = () => {
  return (
   
        <div className='w-screen p-2  flex justify-center '>
      <div className='grid gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mx-auto '>
      <Tabs defaultValue="summer" className="space-y-4 col-span-2">
            <TabsList className='w-full justify-between'>
              <TabsTrigger value="summer">Summer</TabsTrigger>
              <TabsTrigger value="monsoon">
                Monsoon
              </TabsTrigger>
              <TabsTrigger value="autumn">
                Autumn
              </TabsTrigger>
              <TabsTrigger value="winter">
                Winter
              </TabsTrigger>
            </TabsList>
            <TabsContent value="summer" className="space-y-4">
              <Router>
                <Summer/>
              </Router>
            </TabsContent>
            <TabsContent value="monsoon" className="space-y-4">
              <Router>
                <Monsoon/>
              </Router>
            </TabsContent>
            <TabsContent value="autumn" className="space-y-4">
              <Router>
                <Autumn/>
              </Router>
            </TabsContent>
            <TabsContent value="winter" className="space-y-4">
              <Router>
               <Winter/>
              </Router>
            </TabsContent>
          </Tabs>
      </div>
    </div>
    
  );
};

export default Page;
