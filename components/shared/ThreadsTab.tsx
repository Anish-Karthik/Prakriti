import { fetchUserPosts } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react'
import ThreadCard from '../cards/ThreadCard';
import { fetchCommunityPosts } from '@/lib/actions/community.actions';

interface ThreadsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: "User" | "Community";
}

const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
}: ThreadsTabProps) => {
  let result = accountType === "User"? await fetchUserPosts(accountId): await fetchCommunityPosts(accountId);
  console.log(`result ${accountType}`, result);
  // if(!result) return redirect('/')
  console.log(result)

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result && result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          comments={thread.children}
          content={thread.text}
          author={
            accountType === 'User'
              ? { name: result.name, image: result.image, id: result.id}
              : { name: thread.author.name, image: thread.author.image, id:thread.author.id}
          } //todo
          community={thread.community} //todo
          createdAt={thread.createdAt}
          isComment={true}
        />
      ))

      }
    </section>
  )
}

export default ThreadsTab