import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiPhoto } from '@/services/AiPhoto';

export default function PlaceToVisit({ trip }) {
    const itinerary = trip?.tripData?.['Travel Plan']?.Itinerary;
    const daysArray = itinerary ? Object.entries(itinerary) : [];
    let [photo,setphoto]=useState({})
    useEffect(() => {
        const fetchPhotos = async () => {
            let photoObj={};
            for (const [dayKey, places] of daysArray) {
                for (const place of places) {
                    const photoUrl = await AiPhoto(place?.PlaceName);
                    photoObj[place.PlaceName]=photoUrl
                }
            }
            setphoto(photoObj);
        };

        fetchPhotos();
    }, [trip]);

    return (
        <div>
            <h2 className="font-bold text-lg">Places To Visit</h2>
            <div className="mt-5">
                {daysArray.length > 0 ? (
                    daysArray.map(([dayKey, places], index) => (
                        <div key={index} className="mb-6">
                            <h3 className="font-bold text-xl mb-2">{dayKey}</h3>
                            {places.map((place, idx) => (
                                <Link key={idx} target='_blank' to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.PlaceName)}`}>
                                    <div className=" mt-3   border rounded-xl flex flex-col gap-1 p-3 hover:scale-105 transition-all hover:shadow-md cursor-pointer text-black">
                                        <p className='text-orange-700' ><strong>Best Time to Visit:</strong> {place.BestTimeToVisit}</p>
                                        <div className='flex gap-3'>
                                            <div><img src={photo[place.PlaceName]} className="w-[130px] h-[130px] object-cover rounded mt-2" /></div>
                                            <div className='mt-1'>
                                                <h4 className="font-bold text-lg"> {place.PlaceName}</h4>
                                                <p className='text-gray-500 text-sm'> {place.PlaceDetails}</p>
                                                <p className='text-sm'> ⌚ Travel Time: {place.TimeToTravel}</p>
                                                <p className='text-sm'> 🎫 Ticket:{place.TicketPricing}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    ))
                ) : (
                    <p>No itinerary data available.</p>
                )}
            </div>
        </div>
    );
}
