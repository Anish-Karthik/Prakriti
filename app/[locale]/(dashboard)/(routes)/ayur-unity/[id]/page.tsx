import "@/lib/css/styles.css"
import { redirect } from "next/navigation"

import { fetchCommunityDetails } from "@/lib/actions/community.actions"
import { createThread, fetchPosts } from "@/lib/actions/thread.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import serverAuth from "@/lib/serverAuth"
import getCurrentUser from "@/hooks/useCurrentUser"
import ThreadCard from "@/components/cards/ThreadCard"
import Pagination from "@/components/shared/Pagination"

async function Home({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined }
  params: { id: string }
}) {
  const user = await getCurrentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect("/onboarding")

  const community = await fetchCommunityDetails(params.id)

  // const sampleThreads = [
  //   {
  //     text: "I am a sample post",
  //     author: userInfo._id,
  //     communityId: community._id,
  //   },
  //   {
  //     text: `I am a sample post 2 at ${community.name}`,
  //     author: userInfo._id,
  //     communityId: community._id,
  //   },
  //   {
  //     text: `I am a sample post 3 at ${community.name}`,
  //     author: userInfo._id,
  //     communityId: community._id,
  //   },
  //   {
  //     text: `I am a sample post 2 at ${community.name}`,
  //     author: userInfo._id,
  //     communityId: community._id,
  //   },
  // ];

  // sampleThreads.map(async (thread) => await createThread({ ...thread }));

  // TODO: Add create Thread functionality

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  )

  return (
    <div className="p-5 bg-dark-1 pr-9">
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => {
              if (post.community && post.community.name === params.id) {
                return (
                  <ThreadCard
                    key={post._id}
                    id={post._id}
                    currentUserId={user.id}
                    parentId={post.parentId}
                    content={post.text}
                    author={post.author}
                    community={post.community}
                    createdAt={post.createdAt}
                    comments={post.children}
                  />
                )
              }
            })}
          </>
        )}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </div>
  )
}

export default Home
