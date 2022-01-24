
import { Outlet } from "remix";
import React ,{ useEffect,useState } from 'react';
import {Navbar} from "~/components/seacrchClone/Navbar"

import {Footer} from "~/components/seacrchClone/Footer"

import {Routes} from "~/components/seacrchClone/Routes"

import { ResultContextProvider } from "~/contexts/ResultContextProvider";

// import globalS from '~/styles/global.css'

import {
  Button,
  Card,
  ProgressBar,
  Row,
  Col,
  DropdownButton,
  Container,
  Dropdown,
} from "react-bootstrap";


export function links() {
  return [
    // {
    //   rel: "stylesheet",
    //   href: globalS,
    // },
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
  ];
}


export default function videos() {

    const [darkTheme,setDarkTheme]=useState(false)

  return (

    <Container className="ml-5" fluid>
  <Row>
    <Col>  <main>
        <Outlet/>
      </main></Col>
  </Row>
</Container>
    // <div>
   
    //   <div id="alan-btn"></div>
   
    //   <main>
    //     <Outlet/>
    //   </main>
    //   <div>
      /* <ResultContextProvider>
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>
        <Routes/>
        <Footer/>

        </ResultContextProvider> */


    //   </div>
    // </div>
  );
}
