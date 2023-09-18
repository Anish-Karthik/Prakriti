'use client';
import { AccordionTrigger,Accordion,AccordionItem,AccordionContent } from '@/components/ui/accordion';
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col bg-slate-100 p-4 rounded-xl m-4 items-center justify-center'>
      <h2 className='text-center font-semibold text-2xl'>FAQ</h2>
      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  )
}

export default page