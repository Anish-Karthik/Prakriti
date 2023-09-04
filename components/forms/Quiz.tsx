"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { questionMCQarray, TquestionMCQ } from '@/lib/questions'

// export type TAnswer = array of string size of questionMCQ.length
export type TAnswer = string[]

const Quiz = () => {
  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState(questionMCQarray[index])
  const [answerMCQarray, setAnswers] = useState<string[]>(new Array(questionMCQarray.length).fill(''))
  const router = useRouter()

  function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const tmp = [...answerMCQarray]
    tmp[index] = e.currentTarget.value
    setAnswers((prev)=> tmp)
    setIndex((prev) => prev + 1)
  }

  useEffect(() => {
    if(index === questionMCQarray.length) {
      // import react toast
      router.push('/dashboard')
      console.log(`answer`, answerMCQarray)
      toast.success(`Quiz Completed`)
    } else{
      console.log(`question`, questionMCQarray)
      setQuestion(questionMCQarray[index])
    }
  }, [index])


  return (
    <div className='flex-1 flex flex-col items-center justify-center w-2/3 gap-4 bg-slate-100 p-4 h-full'>
      <div className='w-full lg:h-10 rounded-md'>
        <h1 className='text-2xl text-center'>Q.{index+1} of {questionMCQarray.length}</h1>
      </div>
      <div className=' w-full lg:h-20'>
        <h1 className='text-2xl'>{question.question}</h1>
      </div>
      {question.options.map((option, i) => (
        <Button key={i} variant='outline' className='w-full' name={`${i}`} value={option} onClick={(e) => onClick(e)}>
          {option}
        </Button>
      ))}
      <OptionalInput question={question} />
    </div>
  )
}

function OptionalInput({question}: {question: TquestionMCQ}) {
  const [value, setValue] = useState('')

  async function callAPI(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    //TODO: call API here
    
    toast.success(`Quiz Completed`)
  }

  return (
    <div className='flex w-full pt-7'>
      <Input 
      // remove outline
        className='w-full mr-[-5px] p-1 border-2 border-gray-300 rounded-md active:outline-none focus:outline-none focus:ring-2 focus:ring-gray-300'
        placeholder='If you have any other opinions, please mention here'
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        name='optional'
      />
      <Button onClick={(e) => callAPI(e)}>
        Submit
      </Button>
    </div>
  )
}


export default Quiz


