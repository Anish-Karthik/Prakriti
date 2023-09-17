"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { questionMCQarray, TquestionMCQ } from '@/lib/questions'
import { ChatCompletionRequestMessage } from 'openai-edge'
import axios from 'axios'
import { useAuth } from '@clerk/nextjs'

export type TAnswer = {
  answer: string,
  option: 0 | 1 | 2 | -1,
  type: 'vata' | 'pitta' | 'kapha' | 'initial'
  qno: number
}
export type TOptionalInput = {
  question: TquestionMCQ,
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, answerFromUser?: TAnswer) => void
}

const Quiz = () => {    
  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState(questionMCQarray[index])
  const [answerMCQarray, setAnswers] = useState<TAnswer[]>(new Array(questionMCQarray.length).fill({answer: '', type: 'initial', qno: -1, option: -1}))
  const router = useRouter();
  const { userId } = useAuth();
  

  function onClick(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>, answerFromUser?: TAnswer) {
    const tmp = [...answerMCQarray]
    // type if 0 then vata, 1 then pitta, 2 then kapha
    if (e) {
      tmp[index] = {
        answer: e.currentTarget.value, 
        type: mapNumberToType(e.currentTarget.name), 
        option: mapNumberToOptions(e.currentTarget.name),
        qno: index
      }
    } else if(answerFromUser) {
      tmp[index] = answerFromUser
    }
    setAnswers((prev)=> tmp)
    setIndex((prev) => prev + 1)
  }
  async function  submitAnswers()
  {
    // toast.success(`Quiz Completed`)
    // console.log(answerMCQarray)
    toast.loading(`Calculating Prakriti`);
    const response = await axios.post('/api/ai/submitAnswers', {
      answers: answerMCQarray,
    })
    window.sessionStorage.setItem('vata',JSON.stringify(response.data.vata))
    window.sessionStorage.setItem('pitta',JSON.stringify(response.data.pitta))
    window.sessionStorage.setItem('kapha',JSON.stringify(response.data.kapha))
    window.sessionStorage.setItem('prakriti',JSON.stringify(response.data.prakriti))
    // console.log(response.data.prakriti)
    toast.remove();
    toast.success(`Prakriti Calculated ${response.data.prakriti}`);
    router.push('/dashboard')
  }

  useEffect(() => {
    if(index === questionMCQarray.length) {
      // import react toast
      submitAnswers();
    } else{
      //console.log(`question`, questionMCQarray)
      setQuestion(questionMCQarray[index])
    }
  }, [index])
  if(!userId) return null;

  return (
    <div className='flex-1 flex flex-col items-center justify-start w-full xl:w-2/3 gap-4 bg-slate-100 px-4' style={{
      // media query
      
    }}>
      <div className='w-full lg:h-15 rounded-md pt-[130px]'>
        <Button disabled={index == 30 || index == 0} type="submit" className='bg-white text-black hover:bg-gray-300' onClick={(e)=>{
          setIndex((prev)=>prev-1)
        }}>←</Button>
        <h1 className='text-2xl text-center'>Q.{Math.min(index+1, questionMCQarray.length)} of {questionMCQarray.length}</h1>
      </div>
      <div className=' w-full lg:h-20'>
        <h1 className='text-2xl'>{question.question}</h1>
      </div>
    
    
      {question.options.map((option, i) => (
        <Button disabled={index == 30} key={i} variant='outline' className='w-full' name={`${i}`} value={option} onClick={(e) => onClick(e)}>
          {option}
        </Button>
      ))}
      <OptionalInput question={question} onClick={onClick} />
    </div>
  )
}


function OptionalInput({question, onClick}: TOptionalInput) {
  const [value, setValue] = useState('')

  async function callAPI() {

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


export const mapNumberToType = (number: string) => {
<<<<<<< HEAD
  if (number == '0') return 'vatta'
=======
  if (number == '0') return 'vata'
>>>>>>> api-call
  if (number == '1') return 'pitta'
  if (number == '2') return 'kapha'
  return 'initial'
}
export const mapNumberToOptions = (number: string) => {
  if (number == '0') return 0
  if (number == '1') return 1
  if (number == '2') return 2
  return -1
}


