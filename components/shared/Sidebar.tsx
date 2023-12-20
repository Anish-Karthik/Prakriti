"use client";

import { read } from "fs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { NEXT_PUBLIC_APP_NAME } from "@/public/constants";
import { Apple, FileIcon, FileQuestion, HeartPulse, HelpCircle, LayoutDashboardIcon, MessageSquareIcon, SettingsIcon, SunSnow, Users } from "lucide-react";
import { signOut } from "next-auth/react";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";



import { cn } from "@/lib/utils";
import useLanguageStore from "@/hooks/useLanguage";



import { Button } from "../ui/button";


interface LanguageStore {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}
const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
})

// get current path

interface SidebarProps{
  name:string
}

const Sidebar:React.FC<SidebarProps> = ({name}) => {

   const { language, setLanguage } = useLanguageStore() as LanguageStore;

  const [currentRoutes, setRoutes] = useState(routes)

  
  useEffect(()=>{
    switch(language.toLowerCase())
    {
      case "hindi":
        setRoutes(Hindiroutes);
        return
      case "telugu":
        setRoutes(TeluguRoutes);
        return
      case "tamil":
        setRoutes(TamilRoutes);
        return
      default:
        setRoutes(routes);
        return
    }
  })

  const googleTranslateElementInit = () => {
    //@ts-ignore
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    )
  }
  useEffect(() => {
    var addScript = document.createElement("script")
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    )
    document.body.appendChild(addScript)
    //@ts-ignore
    window.googleTranslateElementInit = googleTranslateElementInit
  }, [])
  const pathname = usePathname()
  const router = useRouter()
  return (
    <div className="space-y-4 py-2 flex flex-col h-full bg-[#111827] text-white ">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-2 ">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src={"/images/favicon.ico"} />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            {NEXT_PUBLIC_APP_NAME}
          </h1>
        </Link>

        <div className="space-y-1.5 pt-3 lg:pt-4">
          {currentRoutes.map((route) => (
            <div
              key={route.label}
              onClick={async () => {
                if (route.label === "Logout") {
                  await signOut()
                  router.push(route.href)
                } else {
                  router.push(route.href)
                }
              }}
              className={cn(
                "text-sm group flex p-3 w-full justify-start cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition ",
                montserrat.className,
                pathname === route.href
                  ? "bg-white/50 !important text-black/90"
                  : ""
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={cn("w-5 h-5 mr-2", route.color)}
                  aria-hidden="true"
                />
                {route.label}
              </div>
            </div>
          ))}
        </div>
        <div className="hidden" id="google_translate_element"></div>
        {
          // <Translate></Translate>
        }
      </div>
     
    </div>
  )
}

export default Sidebar

export const routes: {
  label: string
  icon: any
  href: string
  color: string
}[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    href: "/dashboard",
    color: "text-sky-500",
  },

  {
    label: "Yogi",
    icon: MessageSquareIcon,
    href: "/chatbot",
    color: "text-emerald-500",
  },
  {
    label: "Diet Plan",
    icon: Apple,
    href: "/diet-plan",
    color: "text-red-500",
  },

  {
    label: "Ayur-Unity",
    icon: Users,
    href: "/ayur-unity",
    color: "text-sky-500",
  },
  {
    label: "Expert Consultation",
    icon: HeartPulse,
    href: "/ayur-sama",
    color: "text-red-700",
  },

  {
    label: "Seasonal Care",
    icon: SunSnow,
    href: "/seasonal-care",
    color: "text-yellow-500",
  },
  {
    label: "FAQs",
    icon: HelpCircle,
    href: "/faq",
    color: "text-green-500",
  },
  {
    label: "Profile",
    icon: FileIcon,
    href: "/profile",
    color: "text-white-500",
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    href: "/settings",
    color: "text-white-500",
  },
  {
    label: "Logout",
    href: "/sign-in",
    icon: HiArrowLeftOnRectangle,
    color: "text-white-500",
  },
]


export const Hindiroutes: {
  label: string
  icon: any
  href: string
  color: string
}[] = [
  {
    label: "डैशबोर्ड",
    icon: LayoutDashboardIcon,
    href: "/dashboard",
    color: "text-sky-500",
  },

  {
    label: "योगी",
    icon: MessageSquareIcon,
    href: "/chatbot",
    color: "text-emerald-500",
  },
  {
    label: "आहार योजना",
    icon: Apple,
    href: "/diet-plan",
    color: "text-red-500",
  },

  {
    label: "अयूर एकता",
    icon: Users,
    href: "/ayur-unity",
    color: "text-sky-500",
  },
  {
    label: "विशेषज्ञ परामर्श",
    icon: HeartPulse,
    href: "/ayur-sama",
    color: "text-red-700",
  },

  {
    label: "मौसमी देखभाल",
    icon: SunSnow,
    href: "/seasonal-care",
    color: "text-yellow-500",
  },
  {
    label: "सामान्य प्रश्न",
    icon: HelpCircle,
    href: "/faq",
    color: "text-green-500",
  },
  {
    label: "प्रोफाइल",
    icon: FileIcon,
    href: "/profile",
    color: "text-white-500",
  },
  {
    label: "सेटिंग्ज",
    icon: SettingsIcon,
    href: "/settings",
    color: "text-white-500",
  },
  {
    label: "बाहेर पडणे",
    href: "/sign-in",
    icon: HiArrowLeftOnRectangle,
    color: "text-white-500",
  },
]


export const TamilRoutes: {
  label: string
  icon: any
  href: string
  color: string
}[] = [
  {
    label: "டாஷ்போர்டு",
    icon: LayoutDashboardIcon,
    href: "/dashboard",
    color: "text-sky-500",
  },

  {
    label: "யோகி",
    icon: MessageSquareIcon,
    href: "/chatbot",
    color: "text-emerald-500",
  },
  {
    label: "உணவு திட்டம்",
    icon: Apple,
    href: "/diet-plan",
    color: "text-red-500",
  },

  {
    label: "ஆயுர்-ஒற்றுமை",
    icon: Users,
    href: "/ayur-unity",
    color: "text-sky-500",
  },
  {
    label: "நிபுணர் ஆலோசனை",
    icon: HeartPulse,
    href: "/ayur-sama",
    color: "text-red-700",
  },

  {
    label: "பருவகால பராமரிப்பு",
    icon: SunSnow,
    href: "/seasonal-care",
    color: "text-yellow-500",
  },
  {
    label: "அடிக்கடி கேட்கப்படும்",
    icon: HelpCircle,
    href: "/faq",
    color: "text-green-500",
  },
  {
    label: "சுயவிவரம்",
    icon: FileIcon,
    href: "/profile",
    color: "text-white-500",
  },
  {
    label: "அமைப்புகள்",
    icon: SettingsIcon,
    href: "/settings",
    color: "text-white-500",
  },
  {
    label: "வெளியேறு",
    href: "/sign-in",
    icon: HiArrowLeftOnRectangle,
    color: "text-white-500",
  },
]

export const TeluguRoutes: {
  label: string
  icon: any
  href: string
  color: string
}[] = [
  {
    label: "డాష్బోర్డ్",
    icon: LayoutDashboardIcon,
    href: "/dashboard",
    color: "text-sky-500",
  },

  {
    label: "చాట్‌బాట్",
    icon: MessageSquareIcon,
    href: "/chatbot",
    color: "text-emerald-500",
  },
  {
    label: "డైట్ ప్లాన్",
    icon: Apple,
    href: "/diet-plan",
    color: "text-red-500",
  },

  {
    label: "ఆయుర్-యూనిటీ",
    icon: Users,
    href: "/ayur-unity",
    color: "text-sky-500",
  },
  {
    label: "నిపుణుల సంప్రదింపులు",
    icon: HeartPulse,
    href: "/ayur-sama",
    color: "text-red-700",
  },

  {
    label: "సీజనల్ కేర్",
    icon: SunSnow,
    href: "/seasonal-care",
    color: "text-yellow-500",
  },
  {
    label: "తరచుగా అడిగే ప్రశ్నలు",
    icon: HelpCircle,
    href: "/faq",
    color: "text-green-500",
  },
  {
    label: "ప్రొఫైల్",
    icon: FileIcon,
    href: "/profile",
    color: "text-white-500",
  },
  {
    label: "సెట్టింగ్‌లు",
    icon: SettingsIcon,
    href: "/settings",
    color: "text-white-500",
  },
  {
    label: "లాగ్అవుట్",
    href: "/sign-in",
    icon: HiArrowLeftOnRectangle,
    color: "text-white-500",
  },
]