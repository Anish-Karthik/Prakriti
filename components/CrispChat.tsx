"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("126b77eb-f11a-489e-9491-d1234907a1a1")
  }, [])

  return null
}
