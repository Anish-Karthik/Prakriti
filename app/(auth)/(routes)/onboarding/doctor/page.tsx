import { redirect } from "next/navigation"
import { Doctor, User } from "@prisma/client"

import db from "@/lib/db"
import { currentUser } from "@/hooks/currentUser"
import DoctorProfile from "@/components/forms/DoctorProfile"

async function Page() {
  const user = await currentUser()
  if (!user) redirect("sign-in") // to avoid typescript warnings

  // check if user has onboarded
  const userInfo = await db.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      doctor: true,
    },
  })
  console.log(userInfo)
  if (userInfo?.onboarded) redirect("/dashboard")

  const userData: Partial<User> & { doctor?: Doctor | null } = {
    id: user.id,
    username: userInfo?.username || user.username || "",
    name: userInfo?.name || user.name || "",
    bio: userInfo?.bio || "",
    image: user.image || userInfo?.image || "",
    prakriti: userInfo?.prakriti || "",
    onboarded: userInfo?.onboarded || false,
    createdAt: user.createdAt,
    email: user.email,
    hashedPassword: user.hashedPassword,
    updatedAt: user.updatedAt,
    doctor: userInfo?.doctor,
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now, to use Prakriti.
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <DoctorProfile user={userData} />
      </section>
    </main>
  )
}

export default Page
