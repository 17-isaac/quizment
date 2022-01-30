
import { Outlet } from "remix";
import React ,{ useEffect,useState } from 'react';
import {Navbar} from "~/components/seacrchClone/Navbar";


import {Routes} from "~/components/seacrchClone/Routes";

import { ResultContextProvider } from "~/contexts/ResultContextProvider";


import Style from "../../styles/global.css"
//links for styling
export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
    {
      rel: "stylesheet",
      href: Style,
    },
  ];
}


export default function videos() {

 

  return (
    <div>
    
 
 
      <div className="s1">
      <ResultContextProvider>
        <Navbar/>
        <Routes/>


        </ResultContextProvider>


      </div>
    </div>
  );
}
