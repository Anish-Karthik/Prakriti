"use client";
import { questionMCQarray } from "@/lib/questions";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie  } from "recharts"
import { useAuth } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchUserQuiz } from "@/lib/actions/user-quiz.actions";

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
    if(!window.localStorage.getItem('vata') || !window.localStorage.getItem('pitta') || !window.localStorage.getItem('kapha') || !window.localStorage.getItem('prakriti')) {
      const userInfo = await fetchUser(userId);
      const userQuizData = await fetchUserQuiz(userInfo?._id);
      userQuizData?.answers?.forEach((answer: number) => {
        if (answer == 0) vata++;
        else if (answer == 1) pitta++;
        else if (answer == 2) kapha++;
      });
      prakriti = userInfo.prakriti;
      window.localStorage.setItem('vata',JSON.stringify(vata));
      window.localStorage.setItem('pitta',JSON.stringify(pitta));
      window.localStorage.setItem('kapha',JSON.stringify(kapha));
      window.localStorage.setItem('prakriti',JSON.stringify(userInfo.prakriti));
    }
    else {
      vata = Number(window.localStorage.getItem('vata') || 0);
      pitta = Number(window.localStorage.getItem('pitta') || 0);
      kapha = Number(window.localStorage.getItem('kapha') || 0);
      prakriti = JSON.parse(window.localStorage.getItem('prakriti') || '');
    }
    setUserPrakriti(prakriti);
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
        fill:"#7d34fa",
        
      },
      {
        name: "Pitta",
        percentage: pittaPercentage,
        fill:"#faed34"
      },
      {
        name: "Kapha",
        percentage: kaphaPercentage,
        fill:"#19fc75"        
      },
      // {
      //   name: "Vata-Pitta",
      //   percentage: vataPittaPercentage,
      // },
      // {
      //   name: "Vata-Kapha",
      //   percentage: vataKaphaPercentage,
      // },
      // {
      //   name: "Pitta-Kapha",
      //   percentage: pittaKaphaPercentage,
      // },
      // {
      //   name: "Vata-Pitta-Kapha",
      //   percentage: vataPittaKaphaPercentage,
      // },
    ];
  };

  useEffect(() => {
    setLoading(true);
    fetchData().then((data: Tdata[]) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      {loading ?
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      :
        <PieChart className="py-10 w-fit h-fit">
          {/* tootip data also must appear within the chart */}
          <Tooltip />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="2em" fontWeight="bold" fill="#888888">{userPrakriti}</text>
          <Pie data={data} labelLine={true} dataKey="percentage" nameKey="name" cx="50%" cy="50%" innerRadius={100} outerRadius={150}  label />
        </PieChart>
      }
    </ResponsiveContainer>
  )
}
