
import { Outlet } from "remix";
import React ,{ useEffect,useState } from 'react';
import {Navbar} from "~/components/seacrchClone/Navbar"


import {Routes} from "~/components/seacrchClone/Routes"

import { ResultContextProvider } from "~/contexts/ResultContextProvider";




export default function teacherDashboard() {

 

  return (
    <div>
        <h1>Teacher Dashboard</h1>
   
     
    
   
      <main>
        <Outlet/>
      </main>

     
    
    </div>
  );
}
