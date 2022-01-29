import { Outlet } from "remix";
import React, { useEffect, useState } from "react";
import { Navbar } from "~/components/seacrchClone/Navbar";
import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";

import { Routes } from "~/components/seacrchClone/Routes";
import { SideCanva } from "../../components/SideMenuBar/SideCanva";

import { ResultContextProvider } from "~/contexts/ResultContextProvider";

import {
  Button,
  Card,
  ProgressBar,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import Style from "../../styles/global.css";
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


export async function loader() {
    const data = {
      studentDetailsData: await db.student.findUnique({
        where: {
          studentID: 16,
        },
        select: {
          name: true,
          Uid: true,
          streaks: true,
        },
      }),
      studentPerformanceDetails: await db.student.findMany({
        select: {
          name: true,
          Uid: true,
          streaks: true,
       
          totalPts: true,
          redeemedPts: true,
        },
      }),

      studentTotalPtsAvg:await db.student.aggregate({
          _avg:{
              totalPts:true,
              streaks:true
          }
      })
    
    };
   
  
    return data;
  }
  
  
  
  

export default function teacherDashboard() {
  const [darkTheme, setDarkTheme] = useState(false);
  const data = useLoaderData();

  var avgTotal=data.studentTotalPtsAvg._avg.totalPts

  var rAvgTotal=avgTotal.toFixed(2)

  var avgStreaks=data.studentTotalPtsAvg._avg.streaks

  var rAvgStreaks=avgStreaks.toFixed(0)

  return (
    <div>
      <h1>Teacher Dashboard In</h1>
      <SideCanva />
      <Row className="boxas">
      <Card className="boxa col-4 ms-5">
        <Card.Title className="boxaTitle">Average Streaks:</Card.Title>
        <Card.Text>{rAvgStreaks}</Card.Text>
      </Card>

      <Card className="boxa col-4 ms-5">
        <Card.Title className="boxaTitle">Average Student Points:</Card.Title>
        <Card.Text> {rAvgTotal}</Card.Text>
      </Card>

      </Row>

      <h5>{avgStreaks}</h5>
   
    </div>
  );
}
