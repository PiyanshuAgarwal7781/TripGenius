import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useClerk } from '@clerk/clerk-react';
import { SignIn } from '@clerk/clerk-react';

export default function Header() {
  let user = JSON.parse(localStorage.getItem('user'));
  const { signOut } = useClerk();
  const [openDialog, setOpenDialog] = useState(false);

  async function functionLogout() {
    await signOut();
    localStorage.clear();
  }


  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>

      {/* left side logo and name */}
      <div className='flex gap-1 items-center'>
        <img className='h-12 cursor-pointer' src="/reshot-icon-round-travel-flights-MD53NY9TP2.svg" alt="logo" />
        <h2 className='font-bold text-2xl'>WanderMind</h2>
      </div>
      {/* logo and name end */}

      {/* if user is not login show signin or else vire trio and creat trip button along with profil image */}
      {/* user? true:false */}
      {user ? (
        <div className='flex items-center gap-5'>
          <a href='/creat'><Button className={"rounded-full"} >+ Creat Trip</Button></a>
          <a href='/My-trip'><Button className={"rounded-full"} >My Trips</Button></a>
          <Popover>
            <PopoverTrigger>
              <img src={user?.profileImage} className='h-10 rounded-full' alt="profile" />
            </PopoverTrigger>
            <PopoverContent onClick={functionLogout} className="cursor-pointer">Logout</PopoverContent>
          </Popover>
        </div>
      )  : (
        <>
          <Button onClick={() => setOpenDialog(true)}>Signin</Button>
          {/* open and onOPenChange are inbuilt provided by dialog */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className='flex flex-col items-center'>
              <div className='flex  items-center'>
                <img className='h-14' src="/reshot-icon-round-travel-flights-MD53NY9TP2.svg" alt="Travel Icon" />
                <h2 className='font-bold text-2xl'>WanderMind</h2>
              </div>
              <h2 className='font-bold text-lg text-black mt-3'>Sign in to Continue</h2>
              <p className='text-sm'>Sign in with Google to save and generate your trip</p>

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
        </>
      )}
    </div>
  );
}
