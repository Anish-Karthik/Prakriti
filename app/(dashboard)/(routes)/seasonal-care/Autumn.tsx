import ActionAreaCard from '@/components/ImageCard/ActionAreaCard'
import React from 'react'
import { vata } from '@/lib/season_data/autumn'

export const Autumn = () => {
  return (
    <div className='flex justify-center items-end'>
      <div className='grid gap-4 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 '>
        <ActionAreaCard src="https://plus.unsplash.com/premium_photo-1668967516060-624b8a7021f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF1dHVtbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" data='' season=""/>
        <ActionAreaCard src="" data={vata} season='Autumn'/>
      </div>
    </div>
  )
}
