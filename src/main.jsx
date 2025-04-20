import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Creat from "./creat-trip/index"
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { ClerkProvider } from '@clerk/clerk-react'
import ViewTrip from './view-trip/[tripId]/viewTrip.jsx'
import ViewMyTrip from './my_trip/ViewMyTrip.jsx'
let routerObj=createBrowserRouter([
  {
    path:"/",
    element:<App></App>
  },
  {
    path:"/creat",
    element:<Creat/>
  },
  {
    path:"/view-trip/:tripId",
    element:<ViewTrip/>
  },
  {
    path:"/My-trip",
    element:<ViewMyTrip/>
  }
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}



createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Header></Header>
    <Toaster></Toaster>
   <RouterProvider router={routerObj}></RouterProvider>
   </ClerkProvider>
  </StrictMode>,
)
