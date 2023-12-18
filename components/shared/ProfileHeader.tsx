import React from "react"
import Image from "next/image"

interface ProfileHeaderProps {
  authUserId: string
  name: string
  username: string
  imgUrl: string
  bio: string
}

const ProfileHeader = ({
  authUserId,
  name,
  username,
  imgUrl,
  bio,
}: ProfileHeaderProps) => {
  return (
    <section className="flex !w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt={name}
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-light-1 text-heading3-bold">
              {name}
            </h2>
            <p className="text-gray-1 text-base-medium">@{username}</p>
          </div>
        </div>
      </div>
      {/* TODO: community */}

      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </section>
  )
}

export default ProfileHeader
