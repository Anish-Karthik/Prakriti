"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const AyurUnityPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userPrakriti, setUserPrakriti] = useState<string>('');
  const router = useRouter();

  useEffect(() => { 
    setUserPrakriti(JSON.parse(window.localStorage.getItem('prakriti') || ''));
  }, []);
  useEffect(() => {
    if (userPrakriti) {
      router.push(`/ayur-unity/${userPrakriti}`);
    }
  }, [userPrakriti]);

  return (
    <>
    {loading && (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col justify-center items-center text-light-1">
          <div className="animate-spin rounded-full h-72 w-72 border-t-8 border-b-8 border-gray-100"></div>
          <div className="text-4xl font-bold mt-4">Loading...</div>
        </div>
      </div>
    )}
    </>
      
  )
}

export default AyurUnityPage