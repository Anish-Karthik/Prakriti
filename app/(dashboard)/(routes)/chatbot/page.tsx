import ChatComponent from '@/components/ai/ChatComponent'
import { BotAvatar } from '@/components/ai/BotAvatar'


export default function Home() {
  const source="https://i.ibb.co/N7cJc3F/1024.png"

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="bg-slate-800 p-3 w-2/3 rounded-md text-white">
        <div className='flex flex-row py-2 justify-center w-full border-b-2 border-white-500'>
          <BotAvatar 
            props={source}
          />
          <h2 className="text-2xl px-2">Y.O.G.I</h2>
        </div>
        <ChatComponent />
      </div>
    </main>
  )
}