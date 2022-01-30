
import { Outlet } from "remix";
import React ,{ useEffect,useState } from 'react';
import {Navbar} from "~/components/seacrchClone/Navbar"


import {Routes} from "~/components/seacrchClone/Routes"

import { ResultContextProvider } from "~/contexts/ResultContextProvider";




export default function search() {

  

  return (
    <div>
   
     
    
   
      <main>
        <Outlet/>
      </main>

     
    
    </div>
  );
}
