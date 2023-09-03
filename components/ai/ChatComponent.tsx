"use client"
import React, { useEffect, useRef, useState } from "react";
import { useChat, Message } from "ai/react";
import { Input } from "../ui/input";
import { BotAvatar } from "./BotAvatar";
import { useUser} from "@clerk/nextjs"

export default function ChatComponent() {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();
  const [display,setDisplay]=useState('block')
  const yogi="https://i.ibb.co/N7cJc3F/1024.png";
  const {user}=useUser();
  const Profile=user?.profileImageUrl;

  useEffect(() => {
    if(messages.length>0)
        setDisplay('hidden')
    if (chatContainerRef.current)
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      className="chat-container scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 no-scrollbar overflow-auto"
      ref={chatContainerRef}
      style={{
        maxHeight: "400px",
        
      }}
    >
      {messages.map((message: Message) => {
       
        return (
          <div key={message.id}>
            <h3 className="text-lg font-semibold mt-2">
              <div className="flex flex-row py-2">

                {message.role === "assistant" ? (
                  <BotAvatar props={yogi} />
                ) : (
                  <BotAvatar props={Profile} />
                )}

                <h2 className="px-2">{message.role === "assistant" ? "Yogi" : "You"}</h2>
              </div>
            </h3>


            {message.content.split("\n").map((currentTextBlock: string, index: number) => {
              if (currentTextBlock === "") {
                return <p key={message.id + index}>&nbsp;</p>;
              } else {
                return <p key={message.id + index}>{currentTextBlock}</p>;
              }
            })}
          </div>
        );
      })}

      <form className="mt-12" onSubmit={handleSubmit}>
        <div className={"flex flex-row p-2 "+display}>
            <BotAvatar props={yogi}/>
            <p className="px-2">Hey there! I am Yogi,Your Personalized AI for Prakriti</p>
        </div>
        <Input className="text-black" value={input} placeholder="Ask to Y.O.G.I" onChange={handleInputChange} />
      </form>
    </div>
  );
}
