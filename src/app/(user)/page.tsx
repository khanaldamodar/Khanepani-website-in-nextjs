import AboutUs from '@/components/global/AboutUs'
import Awards from '@/components/global/Awards'
import BoardMembers from '@/components/global/BoardMembers'
import Compositions from '@/components/global/Compositions'
import GalleryWithMembers from '@/components/global/HeroSlider'
import MarqueeBanner from '@/components/global/Marquee'
import React from 'react'

const page = () => {
  return (
    <div className='bg-[#4A596B]'>
      <MarqueeBanner/>

      <GalleryWithMembers/> 
      <AboutUs/>
      <BoardMembers/>  
      <Awards/> 

      <Compositions/>
    </div>
  )
}

export default page