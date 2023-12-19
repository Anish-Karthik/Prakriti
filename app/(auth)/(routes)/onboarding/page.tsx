import { redirect } from "next/navigation"
import serverAuth from "@/lib/serverAuth"
import getCurrentUser from "@/hooks/useCurrentUser"
import { fetchUser } from "@/lib/actions/user.actions"
import AccountProfile from "@/components/forms/AccountProfile"

async function Page() {
  //@ts-ignore
  const user = await getCurrentUser();
  if (!user) return null // to avoid typescript warnings

  // check if user has onboarded
  const userInfo = await fetchUser(user.id)
  console.log(userInfo)
  if (userInfo?.onboarded) redirect("/dashboard")

  const userData = {
    id: user.id,
    objectId: userInfo?._id || "",
    //@ts-ignore
    username: userInfo?.username || user.username || "",
    //@ts-ignore
    name: userInfo?.name || user.firstName || "",
    bio: userInfo?.bio || "",
    //@ts-ignore
    image: userInfo?.image || user.imageUrl || "",
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now, to use Prakriti.
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  )
}

export default Page
