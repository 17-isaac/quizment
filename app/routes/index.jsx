import React,{useState} from "react";

import {Navbar} from "~/components/seacrchClone/Navbar"

import {Footer} from "~/components/seacrchClone/Footer"

import {Routes} from "~/components/seacrchClone/Routes"

import { ResultContextProvider } from "~/contexts/ResultContextProvider";


export default function Index() {

const [darkTheme,setDarkTheme]=useState(false)

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
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
