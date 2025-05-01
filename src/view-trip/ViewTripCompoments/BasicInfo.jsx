import React, { useEffect, useState } from 'react'
import { RiSendPlaneFill } from "react-icons/ri";
import { Button } from '@/components/ui/button';
import { AiPhoto } from '@/services/AiPhoto';

export default function BasicInfo({ trip }) {

  let [photo,setphoto]=useState({});
  useEffect(() => {
    const fetchPhotos = async () => {
      let query = `${trip?.userSelection?.location} beaftiful buildings`;
      let photo_url = await AiPhoto(query);
      setphoto(photo_url);
    };
    fetchPhotos();
  }, [trip]);
  
  

  return (
    <div>
      <img className='w-full h-[380px] rounded-xl object-cover' src={photo} alt="" />
      <div id="PlaceInfoDIv" className='mt-10 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl' >{trip?.userSelection?.location}</h2>
        <div className='flex gap-5 mt-5'>
          <div className='flex  gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md'> 📅 {trip?.userSelection?.noOfDays} Day</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md'> 💰 {trip?.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md'> 🧳 No.of Traveller:{trip?.userSelection?.people} people </h2>
          </div>
          <Button><RiSendPlaneFill /></Button>
        </div>
      </div>
    </div>
  )
}
