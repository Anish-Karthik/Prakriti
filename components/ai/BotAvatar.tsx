"use client"

import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BotAvatarProps {
  props: string | undefined
}

export const BotAvatar: React.FC<BotAvatarProps> = ({ props }) => {
  return (
    <Avatar className="h-8 w-8 cursor-pointer items-center justify-center">
      <AvatarImage src={props} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
