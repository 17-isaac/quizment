
import { Outlet } from "remix";
//import react from react
import React from 'react';
//import navbar 
import {Navbar} from "~/components/seacrchClone/Navbar"

//import routes
import {Routes} from "~/components/seacrchClone/Routes"
//import ResultContextProvider
import { ResultContextProvider } from "~/contexts/ResultContextProvider";
//import gloabal.css for styling
import Style from "../../styles/global.css"
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

export default function images() {

   

  return (
    <div>
     
      <div id="alan-btn"></div>
   

      <div className="align-items-center ml-3 s1">
        <ResultContextProvider lg="4">
          <Navbar  />
          <Routes />
      
        </ResultContextProvider>
      </div>
    </div>
  );
}
