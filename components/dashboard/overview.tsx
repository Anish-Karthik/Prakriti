"use client";
import { questionMCQarray } from "@/lib/questions";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip  } from "recharts"
import { useAuth } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchUserQuiz } from "@/lib/actions/user-quiz.actions";
import toast from "react-hot-toast";
import { set } from "mongoose";

type Tdata = {
    name: string,
    percentage: number,
};

export function Overview() {
  const [ data, setData ] = useState<Tdata[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ userPrakriti, setUserPrakriti ] = useState<string>('');
  const { userId } = useAuth();


  const fetchData = async () => {
    if(!userId) return [];
    let vata=0,pitta=0,kapha=0, prakriti='';
    // Fetch user info and quiz data if data is not present in session storage
    if(!window.sessionStorage.getItem('vata') || !window.sessionStorage.getItem('pitta') || !window.sessionStorage.getItem('kapha') || !window.sessionStorage.getItem('prakriti')) {
      const userInfo = await fetchUser(userId);
      const userQuizData = await fetchUserQuiz(userInfo?._id);
      userQuizData?.answers?.forEach((answer: number) => {
        if (answer == 0) vata++;
        else if (answer == 1) pitta++;
        else if (answer == 2) kapha++;
      });
      window.sessionStorage.setItem('vata',JSON.stringify(vata));
      window.sessionStorage.setItem('pitta',JSON.stringify(pitta));
      window.sessionStorage.setItem('kapha',JSON.stringify(kapha));
      window.sessionStorage.setItem('prakriti',JSON.stringify(userInfo.prakriti));
    }
    else {
      vata = Number(window.sessionStorage.getItem('vata') || 0);
      pitta = Number(window.sessionStorage.getItem('pitta') || 0);
      kapha = Number(window.sessionStorage.getItem('kapha') || 0);
      prakriti = window.sessionStorage.getItem('prakriti') || '';
    }
    const totalCount = questionMCQarray.length;
    //vata=parseInt(JSON.parse(vata))

    const vataPercentage = (vata / totalCount) * 100;
    const pittaPercentage = (pitta / totalCount) * 100;
    const kaphaPercentage = (kapha / totalCount) * 100;

    // Calculate combinations based on counts
    const vataPittaPercentage = (vata / totalCount) * (pitta / totalCount) * 100;
    const vataKaphaPercentage = (vata / totalCount) * (kapha / totalCount) * 100;
    const pittaKaphaPercentage = (pitta / totalCount) * (kapha / totalCount) * 100;
    const vataPittaKaphaPercentage =(vata / totalCount) * (kapha / totalCount) * (pitta / totalCount) * 100  ;

    return [
      {
        name: "Vata",
        percentage: vataPercentage,
      },
      {
        name: "Pitta",
        percentage: pittaPercentage,
      },
      {
        name: "Kapha",
        percentage: kaphaPercentage,
      },
      {
        name: "Vata-Pitta",
        percentage: vataPittaPercentage,
      },
      {
        name: "Vata-Kapha",
        percentage: vataKaphaPercentage,
      },
      {
        name: "Pitta-Kapha",
        percentage: pittaKaphaPercentage,
      },
      {
        name: "Vata-Pitta-Kapha",
        percentage: vataPittaKaphaPercentage,
      },
    ];
  };

  useEffect(() => {
    setLoading(true);
    fetchData().then((data: Tdata[]) => {
      setData(data);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    setUserPrakriti(window.sessionStorage.getItem('prakriti') || '');
  }, [data]);


  return (
    <ResponsiveContainer width="100%" height={350}>
      {loading ?
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      :
        <BarChart data={data} margin={{ left: 30, right: 10, top: 10, bottom: 20 }}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]} 
          />
          <Tooltip />
          
          <Bar dataKey="percentage" fill="#adfa1d" radius={[4, 4, 0, 0]} stackId="a" />
        </BarChart>
      }
    </ResponsiveContainer>
  )
}
