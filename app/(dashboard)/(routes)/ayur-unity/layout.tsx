import React from "react"

import "@/lib/css/styles.css"

const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full bg-dark-1 h-full relative">{children}</div>
}

export default CommunityLayout
