
import { Outlet } from "remix";
import React ,{ useEffect,useState } from 'react';
import {Navbar} from "~/components/seacrchClone/Navbar"



import {Routes} from "~/components/seacrchClone/Routes"

import { ResultContextProvider } from "~/contexts/ResultContextProvider";


export default function images() {

  

  return (
    <div>
    
      <div id="alan-btn"></div>
   
      <main>
        <Outlet/>
      </main>
      <div>
      

      </div>
    </div>
  );
}
