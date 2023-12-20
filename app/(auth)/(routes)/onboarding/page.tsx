import Link from "next/link"

import { currentUser } from "@/hooks/currentUser"
import { Button } from "@/components/ui/button"

const page = async () => {
  const user = await currentUser()
  console.log(user)
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <center>
        <div className="flex flex-col gap-3 p-3 shadow-md bg-slate-200">
          <Button>
            <Link href={"/onboarding/doctor"}>
              <h1 className="text-xl">Create A Doctor Account</h1>
            </Link>
          </Button>
          <Button>
            <Link href="/onboarding/user">
              <h1 className="text-xl">Create A User Account</h1>
            </Link>
          </Button>
        </div>
      </center>
    </div>
  )
}

export default page
