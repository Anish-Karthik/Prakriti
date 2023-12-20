import React from "react"

import { vata } from "@/lib/season_data/monsoon"
import ActionAreaCard from "@/components/ImageCard/ActionAreaCard"

export const Monsoon = () => {
  return (
    <div className="flex justify-center items-end">
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 ">
        <ActionAreaCard
          src="https://images.pexels.com/photos/6066205/pexels-photo-6066205.jpeg?auto=compress&cs=tinysrgb&w=600"
          data=""
          season=""
        />
        <ActionAreaCard src="" data={vata} season="Monsoon" />
      </div>
    </div>
  )
}
