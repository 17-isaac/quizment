
import { Outlet } from "remix";
import React ,{ useEffect,useState } from 'react';
import {Navbar} from "~/components/seacrchClone/Navbar"

import {Footer} from "~/components/seacrchClone/Footer"

import {Routes} from "~/components/seacrchClone/Routes"

import { ResultContextProvider } from "~/contexts/ResultContextProvider";




export default function search() {

    const [darkTheme,setDarkTheme]=useState(false)

  return (
    <div>
   
     
    
   
      <main>
        <Outlet/>
      </main>

     
    
    </div>
  );
}
