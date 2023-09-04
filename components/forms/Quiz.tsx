"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'



const Quiz = () => {    
  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState(questionMCQ[index])
  const router = useRouter()

  function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    questionMCQ[index].answer = e.currentTarget.value
    question.answer = e.currentTarget.value
    setIndex((prev) => prev + 1)
  }

  useEffect(() => {
    if(index === questionMCQ.length) {
      // import react toast
      router.push('/dashboard')
      console.log(questionMCQ)
      toast.success(`Quiz Completed`)
    } else{
      console.log(`question`, questionMCQ)
      setQuestion(questionMCQ[index])
    }
  }, [index])


  return (
    <div className='flex-1 flex flex-col items-center justify-center w-2/3 gap-2'>
      <div className='bg-red-500 w-full lg:h-10 rounded-md'>
        <h1 className='text-2xl'>Question {index+1} of 10</h1>
      </div>
      <div className='bg-green-500 w-full lg:h-20'>
        <h1 className='text-2xl'>{question.question}</h1>
      </div>
      {question.options.map((option, i) => (
        <Button key={i} variant='outline' className='w-full' name={`${i}`} value={option} onClick={(e) => onClick(e)}>
          {option}
        </Button>
      ))}
      
    </div>
  )
}

export default Quiz
export interface questionType {
  question: string;
  options: string[];
  answer: string;
}

export const questionMCQ : questionType[] = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Chennai"],
    answer: "",
  },
  {
    question: "What is the capital of China?",
    options: ["Beijing", "Shanghai", "Shenzhen"],
    answer: "",
  },
  {
    question: "What is the capital of USA?",
    options: ["Washington DC", "New York", "Los Angeles"],
    answer: "",
  }
]