"use client";
import { useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip  } from "recharts"

let vatta=0,pitta=0,kapha=0;

  vatta =Number(localStorage.getItem('vatta') || 0);
  pitta =Number(localStorage.getItem('pitta') || 0);
  kapha =Number(localStorage.getItem('kapha') || 0);



const totalCount = 30;
//vatta=parseInt(JSON.parse(vatta))

const vattaPercentage = (vatta / totalCount) * 100;
const pittaPercentage = (pitta / totalCount) * 100;
const kaphaPercentage = (kapha / totalCount) * 100;

// Calculate combinations based on counts
const vattaPittaPercentage = (vatta / totalCount) * (pitta / totalCount) * 100;
const vattaKaphaPercentage = (vatta / totalCount) * (kapha / totalCount) * 100;
const pittaKaphaPercentage = (pitta / totalCount) * (kapha / totalCount) * 100;
const vattaPittaKaphaPercentage =(vatta / totalCount) * (kapha / totalCount) * (pitta / totalCount) * 100  ;

const data = [
  {
    name: "Vata",
    percentage: vattaPercentage,
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
    percentage: vattaPittaPercentage,
  },
  {
    name: "Vata-Kapha",
    percentage: vattaKaphaPercentage,
  },
  {
    name: "Pitta-Kapha",
    percentage: pittaKaphaPercentage,
  },
  {
    name: "Vata-Pitta-Kapha",
    percentage:vattaPittaKaphaPercentage,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
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
    </ResponsiveContainer>
  )
}
