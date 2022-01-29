import { Outlet } from "remix";
import React, { useEffect, useState } from "react";
import { Navbar } from "~/components/seacrchClone/Navbar";
import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";

import { Routes } from "~/components/seacrchClone/Routes";
import { SideCanva } from "../../components/SideMenuBar/SideCanva";

import { ResultContextProvider } from "~/contexts/ResultContextProvider";

import { MDBContainer } from "mdbreact";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

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

    studentTotalPtsAvg: await db.student.aggregate({
      _avg: {
        totalPts: true,
        streaks: true,
      },
    }),

    studentTotalMinPts: await db.student.aggregate({
      _min: {
        totalPts: true,
      },
    }),
    studentTotalMaxPts: await db.student.aggregate({
      _max: {
        totalPts: true,
      },
    }),

    streakCountZero: await db.student.count({
      where: {
        streaks: 0,
      },
    }),
    streakCountOne: await db.student.count({
      where: {
        streaks: 1,
      },
    }),
    streakCountTwo: await db.student.count({
      where: {
        streaks: 2,
      },
    }),
    streakCountThree: await db.student.count({
      where: {
        streaks: 3,
      },
    }),
    streakCountFour: await db.student.count({
      where: {
        streaks: 4,
      },
    }),
    streakCountFive: await db.student.count({
      where: {
        streaks: 5,
      },
    }),
    streakCountMore: await db.student.count({
      where: {
        streaks: {
          notIn: [0, 1, 2, 3, 4, 5],
        },
      },
    }),
  };

  return data;
}

export default function teacherDashboard() {
  const [darkTheme, setDarkTheme] = useState(false);
  const data = useLoaderData();

  var avgTotal = data.studentTotalPtsAvg._avg.totalPts;

  var rAvgTotal = avgTotal.toFixed(2);

  var avgStreaks = data.studentTotalPtsAvg._avg.streaks;

  var rAvgStreaks = avgStreaks.toFixed(0);

  var minPts = data.studentTotalMinPts._min.totalPts;

  var maxPts = data.studentTotalMaxPts._max.totalPts;

  var streakZero = data.streakCountZero;
  var streakOne = data.streakCountOne;
  var streakTwo = data.streakCountTwo;
  var streakThree = data.streakCountThree;
  var streakFour = data.streakCountFour;
  var streakFive = data.streakCountFive;
  var streakMore = data.streakCountMore;

  const dataP = {
    datasets: [
      {
        data: [streakZero, streakOne, streakTwo, streakThree, streakFour,streakFive],
        backgroundColor: ["#5ab0f7", "#ccfbff", "#ff8395", "#ffc29d", "#ef7ac5", "#fe3ba7","#acf6db"],
        hoverBackgroundColor: [
          "#2d8fe0",
          "#bee9ed",
          "#db6576",
          "#e3a37d",
          "#d160a9",
          "#d42686",
          "#6fd9b2"
        ],
      },
    ],
  };

  return (
    <div>
      <Row>
        <Card className="boxa col-4 boxh ms-5">
          <Card.Title className="boxaTitle">Average Student Points:</Card.Title>
          <Card.Text> {rAvgTotal}</Card.Text>
        </Card>

        <Card className="boxa boxh col-3 ms-5">
          <Card.Title className="boxaTitle">Minimum Points :</Card.Title>
          <Card.Text> {minPts}</Card.Text>
        </Card>

        <Card className="boxa boxh col-3 ms-5 ">
          <Card.Title className="boxaTitle">Maximum Points:</Card.Title>
          <Card.Text> {maxPts}</Card.Text>
        </Card>
      </Row>

      <Row>
        <Card className="boxa boxh col-4 ms-5 ">
          <Card.Title className="boxaTitle">Average Streaks:</Card.Title>

          <Card.Text> {rAvgStreaks}</Card.Text>
        </Card>
        <div className="pieSize col-3 ms-5 me-5">
          <h3>Streaks Pie:</h3>
          <MDBContainer>
            <Pie data={dataP} options={{ responsive: true }} />
          </MDBContainer>
        </div>

        <Row className="col-4 ms-5 me-4">
          <Col className="col-4 mt-4 ms-5">
          <div className="streak0 mt-2"></div>
          <div className="streak1 mt-2"></div>
          <div className="streak2 mt-2"></div>
          <div className="streak3 mt-2"></div>
          <div className="streak4 mt-2"></div>
          <div className="streak5 mt-2"></div>
          <div className="streakM mt-2"></div>
          </Col>
        <Col className="col-4 me-5">

          <div className="label  ">
          <div  className="mt-4">
          <h3>0</h3>

          </div>
          <div  className="mt-4">
          <h3>1</h3>

          </div>
          <div className="mt-3">
          <h3>2</h3>

          </div>
          <div className="mt-3">
          <h3>3</h3>

          </div>
          <div className="mt-3">
          <h3>4</h3>

          </div>
          <div className="mt-3">
          <h3>5</h3>

          </div>
          <div className="mt-2">
          <h3>More than 5</h3>

          </div>
          </div>
   
        </Col>

        
          
        </Row>
        
       
      </Row>

    </div>
  );
}
