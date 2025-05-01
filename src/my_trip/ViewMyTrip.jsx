import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/services/fireBase.config';
import { Link } from 'react-router-dom';
import { AiPhoto } from '@/services/AiPhoto';

export default function ViewMyTrip() {
    const [userTrip, setUserTrip] = useState([]);
    const [photo, setPhoto] = useState({});

    async function GetTripByUser() {
        let user = JSON.parse(localStorage.getItem('user'));
        let trips = [];
        const q = query(collection(db, "AiTrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            trips.push({ id: doc.id, ...doc.data() });
        });
        setUserTrip(trips);
    }

    useEffect(() => {
        GetTripByUser();
    }, []);

    useEffect(() => {
        const fetchPhotos = async () => {
            const photoMap = {};
            for (const trip of userTrip) {
                const location = trip?.userSelection?.location;
                const url = await AiPhoto(`${location} beaftiful buildings`);
                photoMap[trip.id] = url;
            }
            setPhoto(photoMap);
        };
        if (userTrip.length > 0) fetchPhotos();
    }, [userTrip]);

    return (
        <div className='md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
                {userTrip.length > 0 ? userTrip.map((trip, index) => (
                    <Link to={'/view-trip/' + trip?.id} key={trip.id}>
                        <div className='hover:scale-105 transition-all'>
                            <img
                                src={photo[trip.id]}
                                alt=""
                                className='rounded-lg h-[250px] w-full object-cover'
                            />
                            <p className='font-bold text-lg mx-1 mt-2'>{trip?.userSelection?.location}</p>
                            <p className='mx-1 text-gray-500'>
                                {trip?.userSelection?.noOfDays} day trip with {trip?.userSelection?.budget} budget
                            </p>
                        </div>
                    </Link>
                )) : (
                    [1, 2, 3, 4, 5, 6].map((_, index) => (
                        <div key={index} className="animate-pulse space-y-2">
                            <div className="h-[250px] w-full bg-gray-300 rounded-lg"></div>
                            <div className="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
