
import UserCard from '@/components/cards/UserCard';
import ProfileHeader from '@/components/shared/ProfileHeader';
import ThreadsTab from '@/components/shared/ThreadsTab';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { fetchCommunityDetails } from '@/lib/actions/community.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const communityTabs = [
  { value: "threads", label: "Posts", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  // { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];

const CommunityPage = async ({ params }: { params: {id: string } }) => {
  const user = await currentUser()
  if(!user)  return null;
  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding');


  const communityDetails = await fetchCommunityDetails(params.id);

  return (
    <section className='bg-dark-1 p-5 pr-9'>
      <ProfileHeader 
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
      />

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {communityTabs.map((tab: any) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === 'Threads' && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>{communityDetails?.threads?.length}</p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={"threads"} className='w-full text-light-1'>
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType="Community"
            />
          </TabsContent>
          <TabsContent value={"members"} className='w-full text-light-1'>
            <section className='mt-9 flex flex-col gap-10'>
              {communityDetails.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType='User'
                />
              ))}
            </section>

          </TabsContent>          
          {/* <TabsContent value={"requests"} className='w-full text-light-1'>
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType="User"
            />
          </TabsContent>         */}
        </Tabs>
      </div>

    </section>
  )
}

export default CommunityPage