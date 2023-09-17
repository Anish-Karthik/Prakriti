"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const AyurUnityPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userPrakriti, setUserPrakriti] = useState<string>('');
  const router = useRouter();

  useEffect(() => { 
    setUserPrakriti(JSON.parse(window.sessionStorage.getItem('prakriti') || ''));
    setLoading(false);
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
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          <div className="text-2xl font-bold mt-4">Loading...</div>
        </div>
      </div>
    )}
    </>
      
  )
}

export default AyurUnityPage