"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { questionMCQarray, TquestionMCQ } from '@/lib/questions'
import { ChatCompletionRequestMessage } from 'openai-edge'
import axios from 'axios'

// export type TAnswer = array of string size of questionMCQ.length
export type TAnswer = {
  answer: string,
  type: 'vatta' | 'pitta' | 'kapha' | 'initial'
  qno: number
}
const mapNumberToType = (number: string) => {
  if (number == '0') return 'vatta'
  if (number == '1') return 'pitta'
  if (number == '2') return 'kapha'
  return 'initial'
}
  

const Quiz = () => {
  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState(questionMCQarray[index])
  const [answerMCQarray, setAnswers] = useState<TAnswer[]>(new Array(questionMCQarray.length).fill({answer: '', type: 'initial', qno: -1}))
  const router = useRouter()

  function onClick(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>, answerFromUser?: TAnswer) {
    const tmp = [...answerMCQarray]
    // type if 0 then vatta, 1 then pitta, 2 then kapha
    if (e) {
      tmp[index] = {answer: e.currentTarget.value, type: mapNumberToType(e.currentTarget.name), qno: index}
    } else if(answerFromUser) {
      tmp[index] = answerFromUser
    }
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
      <OptionalInput question={question} onClick={onClick} />
    </div>
  )
}
export type TOptionalInput = {
  question: TquestionMCQ,
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, answerFromUser?: TAnswer) => void
}

function OptionalInput({question, onClick}: TOptionalInput) {
  const [value, setValue] = useState('')

  async function callAPI() {
    //TODO: call API here
    const userMessage: ChatCompletionRequestMessage = {
      role: 'user',
      content: value,
    }
    const response = await axios.post('/api/ai/classify', {
      message: userMessage,
      question
    })
    const answer = response.data.answer
    onClick(answer)
    toast.success(`Answer Classified`)
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
        // on click enter call api
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            callAPI()
          }
        }}
      />
      <Button onClick={callAPI}>
        Submit
      </Button>
    </div>
  )
}


export default Quiz


