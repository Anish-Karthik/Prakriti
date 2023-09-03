"use client"
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import TypewriterComponent from 'typewriter-effect';
import { Button } from '../ui/button';

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className='text-white font-bold py-36 text-center space-y-5'>
      <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl'>
        <h1>Know Your Prakriti,Know Your LifeStyle</h1>
        <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 py-2'>
          <TypewriterComponent
            options={{
              strings: [
                "AI Aided Tests.",
                "AI Assisted Personel queries.",
                "Specialized AI Chatbots.",
                "AI Aided Personel Consultation.",
                "Large Forum.",
                "Expert Consultation.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className='text-sm md:text-xl font-light text-zinc-400'>
        Know your Prakriti now and get AI aided support for your health and wellness.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant='premium' className='md:text-lg p-4 md:p-6 rounded-full font-semibold'>
            Know your Prakriti now
          </Button>
        </Link>
      </div>
      <div className='text-zinc-400 text-xs md:text-sm font-normal'>
        Your health is our priority.
      </div>
    </div>
  )
}