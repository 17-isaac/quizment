import React, { useEffect, useState } from "react";
//import navbar for searchClone
import { Navbar } from "~/components/seacrchClone/Navbar";


//import routs for searchClone
import { Routes } from "~/components/seacrchClone/Routes";
//import ResultContextProvider
import { ResultContextProvider } from "~/contexts/ResultContextProvider";


//import sylesheet
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

export default function search() {
//search function

  return (
    <div>
  

      <div className="col-8 s1">
        <ResultContextProvider lg="4">
          <Navbar  />
          <Routes />
          
        </ResultContextProvider>
      </div>
    </div>
  );
}
