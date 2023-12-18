import React from "react"
import Link from "next/link"

import { DietSummary } from "../dashboard/DietSummary"
import { Overview } from "../dashboard/overview"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

export const Overview_Tab = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/chatbot" className="cursor-pointer">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Interact with our ChatBot
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-6 w-6 text-muted-foreground"
              >
                <path d="M7 7h10a2 2 0 0 1 2 2v1l1 1v3l-1 1v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3l-1-1v-3l1-1V9a2 2 0 0 1 2-2zm3 9h4" />
                <circle cx="8.5" cy="11.5" r=".5" fill="gray" />
                <circle cx="15.5" cy="11.5" r=".5" fill="gray" />
                <path d="M9 7L8 3m7 4l1-4" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Y.O.G.I</div>
              <p className="text-xs text-muted-foreground">
                A Companion for your Ayurveda needs
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/ayur-unity" className="cursor-pointer">
          <Card className="cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Socialize in our community
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">AyurUnity</div>
              <p className="text-xs text-muted-foreground">
                A Social-Platform that connects Users
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/seasonal-care" className="cursor-pointer">
          <Card className="cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Stay healthy in all seasons
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
              >
                <path
                  fill="gray"
                  d="M14 15q.425 0 .738-.313t.312-.737q0-.425-.313-.737T14 12.9q-.425 0-.738.313t-.312.737q0 .425.313.738T14 15Zm-.75-3.2h1.5q0-.725.15-1.063t.7-.887q.75-.75 1-1.212t.25-1.088q0-1.125-.788-1.837T14 5q-1.025 0-1.788.575T11.15 7.1l1.35.55q.225-.625.613-.938T14 6.4q.6 0 .975.338t.375.912q0 .35-.2.663t-.7.787q-.825.725-1.012 1.137T13.25 11.8ZM8 18q-.825 0-1.413-.588T6 16V4q0-.825.588-1.413T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.588 1.413T20 18H8Zm0-2h12V4H8v12Zm-4 6q-.825 0-1.413-.588T2 20V6h2v14h14v2H4ZM8 4v12V4Z"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Seasonal Care</div>
              <p className="text-xs text-muted-foreground">
                An AI integrated Standard
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/ayur-sama" className="cursor-pointer">
          <Card className="cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Get Expert Consutations
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ayur-Sama</div>
              <p className="text-xs text-muted-foreground">
                Get consultation from real Doctors
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="md:col-span-3 col-span-4">
          <CardHeader>
            <CardTitle>Diet Plan Summary</CardTitle>
            <CardDescription>
              You gained 570 calories this week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DietSummary />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Overview_Tab
