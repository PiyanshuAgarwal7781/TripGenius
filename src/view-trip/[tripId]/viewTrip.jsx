import { db } from '@/services/fireBase.config';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import BasicInfo from '../ViewTripCompoments/BasicInfo';
import Hotel from '../ViewTripCompoments/Hotel';
import PlaceToVisiste from '../ViewTripCompoments/PlaceToVisiste';

export default function viewTrip() {
  let { tripId } = useParams();
  let [trip, setTrip] = useState([]);
  useEffect(() => {
    tripId && getTrip();
  }, [tripId])
  // used to get trip info from fire base
  async function getTrip() {
    let docref = doc(db, 'AiTrips', tripId);
    let docSnap = await getDoc(docref)
    if (docSnap.exists()) {
      console.log("the docData is", docSnap.data())
      setTrip(docSnap.data());
    }
    else {
      console.log("error")
      toast('no such trip found')
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56 gap-10 flex flex-col' >
      {/* basic info */}
      <BasicInfo trip={trip}></BasicInfo>
      {/* hotel recomendition */}
      <Hotel trip={trip} ></Hotel>
      {/* days wise plan */}
      <PlaceToVisiste trip={trip} ></PlaceToVisiste>
      {/* footer */}
    </div>
  )
}
