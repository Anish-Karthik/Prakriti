import React from "react"

import { vata } from "@/lib/season_data/summer"
import ActionAreaCard from "@/components/ImageCard/ActionAreaCard"

export const Summer = () => {
  return (
    <div className="flex justify-center items-end">
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 ">
        <ActionAreaCard
          src="https://images.pexels.com/photos/3355788/pexels-photo-3355788.jpeg?auto=compress&cs=tinysrgb&w=600"
          data=""
          season=""
        />
        <ActionAreaCard src="" data={vata} season="Summer" />
      </div>
    </div>
  )
}
