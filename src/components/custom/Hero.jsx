import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <div className='flex flex-col items-center gap-9 mx-56 ' >
      <h1 className='font-extrabold text-center mt-16 '>
        <span className='text-[#f56551]' >Discover Your Next Adventure with AI: </span>Personalized Itineraries at Your Fingertips</h1>
      <p className='text-gray-500' >Your Personal Trip Planner & Travel Curator
        Crafting Custom Itineraries Tailored to Your Interests & Budget</p>
      <Link to={"/Creat"} ><Button>Get's Started, It's Free</Button></Link>

    </div>
  )
}
