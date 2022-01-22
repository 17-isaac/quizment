

import React ,{ useEffect,useState } from 'react';
import {Navbar} from "~/components/seacrchClone/Navbar"

import {Footer} from "~/components/seacrchClone/Footer"

import {Routes} from "~/components/seacrchClone/Routes"

import { ResultContextProvider } from "~/contexts/ResultContextProvider";


export default function search() {

    const [darkTheme,setDarkTheme]=useState(false)

  return (
    <div>
      <h1>search</h1>
      <div id="alan-btn"></div>
   
      
      <div>
      <ResultContextProvider>
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>
        <Routes/>
        <Footer/>

        </ResultContextProvider>


      </div>
    </div>
  );
}
