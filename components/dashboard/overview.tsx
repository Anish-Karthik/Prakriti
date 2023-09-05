"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Vata",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Pitha",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Kapha",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Vata-pita",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Vata-Kapha",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Kapha-Pita",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Vata-pita",
    total: Math.floor(Math.random() * 50) + 10,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350} >
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}