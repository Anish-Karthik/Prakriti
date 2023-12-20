"use client"

import { SetStateAction, useState } from "react"

import { BotAvatar } from "@/components/ai/BotAvatar"
import ChatComponent from "@/components/ai/ChatComponent"

export default function Home() {
  const source = "https://i.ibb.co/N7cJc3F/1024.png"
  const [selectedLanguage, setSelectedLanguage] = useState("english")

  const handleLanguageChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedLanguage(event.target.value)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="bg-slate-800 p-3 w-full xl:w-2/3 rounded-md text-white">
        <div className="flex flex-row py-2 justify-center w-full border-b-2 border-white-500">
          <BotAvatar props={source} />
          <h2 className="text-2xl px-2">Y.O.G.I</h2>
          <div className="text-right absolute right-48 pb-6 borderr-0">
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="w-[180px] text-white bg-transparent"
            >
              <option value="english" className="text-black">
                English
              </option>
              <option value="tamil" className="text-black">
                Tamil
              </option>
              <option value="Hindi" className="text-black">
                Hindi
              </option>
              <option value="Telugu" className="text-black">
                Telugu
              </option>
              <option value="Spanish" className="text-black">
                Spanish
              </option>
              <option value="Gujarati" className="text-black">
                Gujarati
              </option>
              <option value="Bengali" className="text-black">
                Bengali
              </option>
            </select>
          </div>
        </div>
        <ChatComponent language={selectedLanguage} />
      </div>
    </main>
  )
}
