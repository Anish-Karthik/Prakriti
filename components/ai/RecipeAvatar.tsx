"use client"

import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecipeAvatar {
  props: string | undefined
}

export const RecipeAvatar: React.FC<RecipeAvatar> = ({ props }) => {
  return (
    <Avatar className="h-12 w-12 cursor-pointer ">
      <AvatarImage src={props} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
