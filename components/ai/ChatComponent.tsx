"use client"

import React, { useEffect, useRef, useState } from "react"
import { User } from "@prisma/client"
import { Message, useChat } from "ai/react"
import axios from "axios"
import { toast } from "react-hot-toast"

import getCurrentUser from "@/hooks/useCurrentUser"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { BotAvatar } from "./BotAvatar"

interface DashboardPageProps {
  user?: User
}

const ChatComponent: React.FC<DashboardPageProps> = ({ user }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  const {
    setInput,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    messages,
  } = useChat()
  const [languageMessages, setLanguageMessages] = useState<Message[]>([])
  //const [messages,setMessages]=useState([])
  const [language, SetLanguage] = useState("HINDI")
  const [display, setDisplay] = useState("block")
  const [flag, setFlag] = useState(false)
  const [option_view, setoption_view] = useState("hidden")
  const yogi = "https://i.ibb.co/N7cJc3F/1024.png"

  const Profile = ""

  useEffect(() => {
    if (messages.length > 0) setDisplay("hidden")
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  }, [messages])

  const setPrakriti = async (prakriti: string) => {
    await axios.post("/api/setPrakriti", {
      userId: user?.id,
      prakriti: prakriti,
    })
    setFlag(true)
  }

  const sendPostRequest = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages,
          lang: language,
        }),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const stream = await response.arrayBuffer()
      const data = JSON.parse(new TextDecoder().decode(stream))
      console.log(data + "jjksdjb")
      // Create a new message object with id, role, and content
      const newMessage: Message = {
        id: String(Math.random() * 10),
        content: data,
        role: "assistant",
      }

      // Add the new message to languageMessages

      const tmp: Message[] = [newMessage, ...languageMessages]

      setLanguageMessages(tmp)
    } catch (error: any) {
      console.error("Error:", error)
    }
  }

  return (
    <div
      className="chat-container scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100   overflow-auto"
      ref={chatContainerRef}
      style={{
        maxHeight: "500px",
      }}
    >
      {language === "english" ? (
        messages.map((message: Message) => (
          <div key={message.id}>
            <h3 className="text-lg font-semibold mt-2">
              <div className="flex flex-row py-2">
                {message.role === "assistant" ? (
                  <BotAvatar props={yogi} />
                ) : (
                  <BotAvatar props={Profile} />
                )}
                <h2 className="px-2">
                  {message.role === "assistant" ? "Yogi" : "You"}
                </h2>
              </div>
            </h3>
            {message.content
              .split("\n")
              .map((currentTextBlock: string, index: number) => {
                if (currentTextBlock === "") {
                  return <p key={message.id + index}>&nbsp;</p>
                } else {
                  if (currentTextBlock.includes("Vata") && flag === false) {
                    setFlag(true)
                    setPrakriti("Vata")
                  } else if (
                    currentTextBlock.includes("Pitta") &&
                    flag === false
                  ) {
                    setFlag(true)
                    setPrakriti("Pitta")
                  } else if (
                    currentTextBlock.includes("Kapha") &&
                    flag === false
                  ) {
                    setFlag(true)
                    setPrakriti("Kapha")
                  }
                  return <p key={message.id + index}>{currentTextBlock}</p>
                }
              })}
          </div>
        ))
      ) : (
        <>
          {languageMessages.map((message: Message) => (
            <div key={message.id}>
              <h3 className="text-lg font-semibold mt-2">
                <div className="flex flex-row py-2">
                  {message.role === "assistant" ? (
                    <BotAvatar props={yogi} />
                  ) : (
                    <BotAvatar props={Profile} />
                  )}
                  <h2 className="px-2">
                    {message.role === "assistant" ? "Yogi" : "You"}
                  </h2>
                </div>
              </h3>
              {/* @ts-ignore */}
              <p>{message.content.choices[0].message.content}</p>
            </div>
          ))}
        </>
      )}

      <form
        className="mt-12"
        onSubmit={language === "english" ? handleSubmit : sendPostRequest}
      >
        <div className={"flex flex-row p-2 " + display}>
          <BotAvatar props={yogi} />
          <p className="px-2">
            Hey there! I am Yogi,Your Personalized AI for Prakirthi{" "}
          </p>
        </div>
        <div
          className={
            "w-full justify-between flex flex-col gap-4 px-5 py-5 items-stretch hidden"
          }
        >
          {/* <Button 
          onClick={()=>{
            setInput("A");
            handleSubmit;
          }}
          >A</Button>
          <Button>B</Button>
          <Button>C</Button> */}
        </div>
        <div className="flex flex-row py-2">
          <Input
            className="text-black"
            value={input}
            placeholder="Ask to Y.O.G.I"
            onChange={handleInputChange}
          />
          <Button
            className="font-bold text-lg mx-2 bg-green-500 hover:bg-green-400"
            type="submit"
          >
            {" "}
            →
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChatComponent
