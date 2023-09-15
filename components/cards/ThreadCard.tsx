import { fetchCommunityDetails } from '@/lib/actions/community.actions';
import { cn, formatDateString } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'path';
import React from 'react'

interface ThreadCardProps {
  key: string;
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    id: string;
    image: string;
    name: string;
  }
  community: string | null;
  createdAt: string
  comments: {
    author: {
      image: string;
    }
  }[]
  isComment?: boolean;
}


const ThreadCard = async ({
  key,
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: 
  ThreadCardProps
) => {
  console.log('Community', community)
  const communityDetails = await fetchCommunityDetails(community ?? "");
  return (
    <article className={cn('flex flex-col w-full rounded-xl', isComment? 'px-0 xs:px-7 py-3': 'bg-dark-2 p-7')}>
      <div className='flex items-start justify-between'>

        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image 
                src={author.image}
                alt='profile image'
                className='rounded-full cursor-pointer'
                layout='fill'
              />
            </Link>
            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-2'>{author.name}</h4>
            </Link>

            <p className='mt-2 text-small-regular text-light-2'>{content}</p>

            <div className={cn('mt-5 flex flex-col gap-3', isComment ? 'mb-10': '')}>
              <div className='flex gap-3.5'>
                <Image src="/assets/heart-gray.svg" alt='heart' width={24} height={24} className='cursor-pointer object-contain' />
                <Link href={`/thread/${id}`}>
                  <Image src="/assets/reply.svg" alt='reply' width={24} height={24} className='cursor-pointer object-contain' />
                </Link>
                <Image src="/assets/repost.svg" alt='repost' width={24} height={24} className='cursor-pointer object-contain' />
                <Image src="/assets/share.svg" alt='share' width={24} height={24} className='cursor-pointer object-contain' />
              </div>

              {(isComment && comments.length > 0) && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} {comments.length === 1 ? 'reply' : 'replies'}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* TODO: Delete Thread */}
        {/* TODO: comment Logo */}
        
      </div>
      {!isComment && community && (
        <Link href={`/communities/${communityDetails.id}`} className='mt-5 flex items-center'>
          <p className='text-subtle-medium text-gray-1'>{formatDateString(createdAt)} - {communityDetails.name} Community</p>
          <Image 
            src={communityDetails.image}
            alt={communityDetails.name}
            className='ml-1 rounded-full cursor-pointer object-cover'
            width={14}
            height={14}
          />
        </Link>
      )}
    </article>
  )
}

export default ThreadCard