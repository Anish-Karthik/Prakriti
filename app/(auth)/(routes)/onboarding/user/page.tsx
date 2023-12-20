import { redirect } from "next/navigation"
import { User } from "@prisma/client"

import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@/hooks/currentUser"
import AccountProfile from "@/components/forms/AccountProfile"

async function Page() {
  const user = await currentUser()
  if (!user) return null // to avoid typescript warnings

  // check if user has onboarded
  const userInfo = await fetchUser(user.id)
  console.log(userInfo)
  if (userInfo?.onboarded) redirect("/dashboard")

  const userData: Partial<User> = {
    id: user.id,
    username: userInfo?.username || user.username || "",
    name: userInfo?.name || user.name || "",
    bio: userInfo?.bio || "",
    image: user.image || userInfo?.image || "",
    prakriti: userInfo?.prakriti || "",
    onboarded: userInfo?.onboarded || false,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    email: user.email!,
    hashedPassword: user.hashedPassword!,
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now, to use Prakriti.
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} />
      </section>
    </main>
  )
}

export default Page
