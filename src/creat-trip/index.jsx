import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input';
import { budgetList, SelectOptions, Prompt } from '@/constants/options';
import { Button } from '@/components/ui/button';
import LocationAutocomplete from '@/components/custom/locationAutoFill';
import { toast } from 'sonner';
import { sendMessage } from '@/services/aiChat';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useUser } from '@clerk/clerk-react'
import { SignIn } from "@clerk/clerk-react"
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/fireBase.config';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function index() {
  let [change, setChange] = useState([]);
  let [openDialLog, setOpenDialLog] = useState(false)
  const { isLoaded, isSignedIn, user } = useUser();
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  function handleInputChange(name, item) {
    setChange((prev) => ({
      ...prev,
      [name]: item,
    }));
  }

  async function onGenerateTrip() {
    if (!isLoaded) {
      toast("Authentication system is loading...");
      return;
    }

    if (!isSignedIn) {
      setOpenDialLog(true);
      return;
    }

    if (!change?.noOfDays || !change?.location || !change?.people || !change?.budget) {
      toast("Please enter all details");
      return;
    }

    if (change.noOfDays > 5) {
      toast("Trips longer than 5 days are not supported yet");
      return;
    }
    setLoading(true)
    let final_prompt = Prompt
      .replace("{location}", change?.location)
      .replace("{Total days}", change?.noOfDays)
      .replace("{traveller}", change?.people)
      .replace("{budget}", change.budget);

    console.log(final_prompt)
    console.log("Trip Data:", change);

    sendMessage(final_prompt)
  .then((result) => {
    setLoading(false);
    if (result) {
      console.log("AI Response (parsed JSON):", result); //  Optional log
      SaveAiTrip(result); //  JSON is already parsed
    } else {
      toast("Failed to get valid trip data. Please try again."); // Handle JSON parsing failure
    }
  })
  .catch((error) => {
    console.error("Error while fetching AI response:", error);
    toast("Something went wrong while generating the trip. Please try again.");
  });
  }

  async function SaveAiTrip(TripData) {

    // Add a new document in collection "cities"
    setLoading(true)
    let docId = Date.now().toString();
    let userLocal = JSON.parse(localStorage.getItem('user'))
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: change, //change == form data
      tripData: TripData,
      userEmail: userLocal?.email,
      id: docId
    });
    await setDoc(doc(db, "UserInfo", userLocal?.email), {
      firstName: userLocal?.firstName,
      lastName: userLocal?.lastName,
      emailAddress: userLocal?.email,
      profilImgUrl: userLocal?.profileImage,
    });
    setLoading(false)
    navigate("/view-trip/" + docId)
  }

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.imageUrl
      }));
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    // hero section
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-64 px-5 mt-10 ' >
      <h2 className='font-bold text-3xl' >Tell Us Your Travel Preferences 🏕️🏖️</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just share a few details, and our AI trip planner will craft your perfect itinerary—tailored to your budget and dreams.</p>

      <div className='mt-20 flex flex-col gap-10' >
        {/*location->google place auto complete */}
        <LocationAutocomplete onChange={(value) => handleInputChange('location', value)} />

        {/* days form  */}
        <div>
          <h2 className='text-xl my-3 font-medium' >How many days you are planning your trip</h2>
          <Input placeholder={"Ex-3"} type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          ></Input>
        </div>

        {/* budget */}
        <div>
          <h2 className='text-xl my-3 font-medium' >What is your Budget</h2>
          <div className='grid grid-cols-3 mt-5 gap-5' >
            {budgetList.map((item, index) => (
              <div key={index} className={`p-4 border rounded-lg hover:shadow-lg hover:cursor-pointer ${change.budget == item.title && 'border-black'} `}
                onClick={() => handleInputChange('budget', item.title)}
              >
                <h2 className='text-3xl mb-2' >{item.icon}</h2>
                <h2 className='font-bold text-lg' >{item.title}</h2>
                <h2 className='text-sm text-gray-600'>{item.desc}</h2>

              </div>
            ))}
          </div>
        </div>

        {/* people select */}
        <div>
          <h2 className='text-xl my-3 font-medium' >Who do you plan on travelling with on your next adventure ?</h2>
          <div className='grid grid-cols-3 mt-5 gap-5' >
            {SelectOptions.map((item, index) => (
              <div key={index} className={`p-4 border rounded-lg hover:shadow-lg hover:cursor-pointer ${change.people == item.people && 'border-black'} `}
                onClick={() => handleInputChange('people', item.people)}
              >
                <h2 className='text-3xl mb-2' >{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-600' >{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* generate trip button */}
      <div className='mt-10  flex justify-end p-3' >
        <Button
          disabled={loading}
          onClick={onGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : "Generate Trip"
          }
        </Button>
        <Dialog open={openDialLog} onOpenChange={setOpenDialLog}>
          <DialogContent className='flex flex-col items-center'>
          <div className='flex  items-center'>
              <img className='h-14' src="/reshot-icon-round-travel-flights-MD53NY9TP2.svg" alt="Travel Icon" />
              <h2 className='font-bold text-2xl'>WanderMind</h2>
              </div>
            <p className='text-sm'>Sign in with Google to save and generate your trip</p>

            {/* Clerk SignIn Component - this renders the Google Sign-in UI */}
            <div className='w-full mt-5 flex items-center ml-15'>
              <SignIn
                routing="virtual"
                afterSignInUrl={window.location.href}
                redirectUrl={window.location.href}
                appearance={{
                  variables: {
                    colorPrimary: "#4f46e5"
                  }
                }}
              />
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>


  )
}
