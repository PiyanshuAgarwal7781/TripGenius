import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiPhoto } from '@/services/AiPhoto';

export default function Hotel({ trip }) {
  let [photo, setphoto] = useState({});
  // extract hotels from trip informations so that we can map them 
  const hotels = trip?.tripData?.["Travel Plan"]?.Hotels;
  // console.log("Hotels:", hotels);
  
  useEffect(() => {
    const fetchPhotos = async () => {
      let photoObj = {};
      for (let hotel of hotels || []) {
        let photo_url = await AiPhoto(hotel.HotelName)
        // console.log(photo_url)
        photoObj[hotel.HotelName] = photo_url
      }
      setphoto(photoObj);
    };

    fetchPhotos();
  }, [trip]);


  return (
    <div>
      <h2 className='font-bold text-xl'>
        Hotel Recommendition
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5'>
        {hotels?.map((item, index) => (
          // link so tha when user click on hotle it takes to google map 
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item?.HotelName + ', ' + item?.HotelAddress)}`}
            target='_blank'
            key={index}
          >
            <div className='hover:scale-105 transition-all cursor-pointer'>
              <img className='rounded-xl object-cover h-[130px] w-full' src={photo[item?.HotelName]} alt={item.HotelName} />
              <div className='mt-3 ml-1 flex flex-col gap-2'>
                <p className=' font-medium' >{item?.HotelName}</p>
                <h2 className='  text-gray-500 text-sm ' >📍{item?.HotelAddress}</h2>
                <h2 className='text-sm '> 💳 {item?.Price}</h2>
                <h2 className='text-sm '> ⭐{item?.Rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


