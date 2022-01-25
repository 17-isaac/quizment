import { useLoaderData, Link } from "remix";
import { db } from "~/utils/db.server";
import {
  Button,
  Card,
  ProgressBar,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import performanceCal from "~/components/algorithm/performanceCal";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
  ];
}

const num = 5;

export async function loader() {
  const data = {
    studentPerformanceDetails: await db.student.findMany({
      select: {
        name: true,
        Uid: true,
        streaks: true,
        mazeLvl: true,
        totalPts: true,
        redeemedPts: true,
      },
      orderBy: { name: "asc" },
    }),

    bacdgeR: await db.badgeClass.findMany({
      select: {
        badge: {
          select: {
            name: true,
            requirements: true,
            pic_url: true,
          },
        },
        className: true,
      },
    }),

    userCount: await db.student.count(),
  };
  console.log("==============================================");
  // db.$disconnect();
  return data;
}

export default function teacherViewStudentProgressContent() {
  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    alanBtn({
      key: "b1283306f4a5fd0478ce1ceec798da192e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          console.log(articles);
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "studentProg") {
          window.open(
            "http://localhost:3000/teacherViewStudentProgress",
            "_self"
          );
        } else if (command === "topStudents") {
          window.open(
            "http://localhost:3000/teacherViewStudentProgress/sortHighPts",
            "_self"
          );
        } else if (command === "bottomStudents") {
          window.open(
            "http://localhost:3000/teacherViewStudentProgress/sortLowPts",
            "_self"
          );
        } else if (command === "mzStudents") {
          window.open(
            "http://localhost:3000/teacherViewStudentProgress/mz",
            "_self"
          );
        } else if (command === "streakStudents") {
          window.open(
            "http://localhost:3000/teacherViewStudentProgress/streaks",
            "_self"
          );
        } else if (command === "studentDash") {
          window.open("http://localhost:3000/StudentDashboard", "_self");
        } else if (command === "newsResource") {
          window.open("http://localhost:3000/resourceNews", "_self");
        } else if (command === "") {
        }
      },
    });

    function sendData() {
      alanBtn.activate();
      alanBtn.callProjectApi(
        "greetUser",
        {
          user: "John Smith",
        },
        function (error, result) {}
      );
    }
  }, []);

  const { studentPerformanceDetails, userCount, bacdgeR } = useLoaderData();

  const numOfUser = userCount;

  const [visible, setVisible] = useState(3);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };
  const TStreaks = 5;
  const TMazeLvl = 8;
  const streakWeightage = 50;
  const mazeWeightage = 50;
  const overall = 0;
  const y = 9;
  const x = 9;
  console.log("=+======+========= 1 ========+=================+");
  console.log(bacdgeR);

  console.log("============================================");

  // console.log("Badge info: "+bacdgeR[4].badge[0].name)
  console.log("Badge name: " + bacdgeR[3].badge[0].name);
  console.log("Badge requirement: " + bacdgeR[3].badge[0].requirements);
  console.log("Badge pic url: " + bacdgeR[3].badge[0].pic_url);
  console.log("class name: " + bacdgeR[3].className);

  return (
    <div>
      <div></div>
      <Row style={{ marginLeft: 1300 }}>
        <DropdownButton
          id="dropdown-item-button"
          title="Options"
          className="ml-5 dropdown secondary"
          variant="light"
        >
          <Link
            style={{ textDecorationLine: "none" }}
            to="/teacherViewStudentProgress"
          >
            <Dropdown.Item as="button">Sort by Users(a-z)</Dropdown.Item>
          </Link>
          <Link
            style={{ textDecorationLine: "none" }}
            to="/teacherViewStudentProgress/streaks"
          >
            <Dropdown.Item as="button">Streak</Dropdown.Item>
          </Link>
          <Link
            style={{ textDecorationLine: "none" }}
            to="/teacherViewStudentProgress/sortHighPts"
          >
            <Dropdown.Item as="button">Sort by highPoints</Dropdown.Item>
          </Link>
          <Link
            style={{ textDecorationLine: "none" }}
            to="/teacherViewStudentProgress/sortLowPts"
          >
            <Dropdown.Item as="button">Sort by lowPoints</Dropdown.Item>
          </Link>
          <Link
            style={{ textDecorationLine: "none" }}
            to="/teacherViewStudentProgress/mz"
          >
            <Dropdown.Item as="button">Maze</Dropdown.Item>
          </Link>
        </DropdownButton>
      </Row>
      <Row>
        <Row lg="4">
          {/* <h1>Total user:{userCount}</h1> */}

          {/* <h1>{badge.name}</h1> */}

          {studentPerformanceDetails
            .map((data, i) => (
              <Card key={i} className=" m-5">
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>{i}</Card.Title>
                      <Card.Title>{data.name.split("@")[0]}</Card.Title>

                      <Card.Text>Number of streaks:</Card.Text>

                      <ProgressBar
                        style={{ width: "10rem" }}
                        variant={
                          data.streaks * 20 > 75
                            ? "success"
                            : data.streaks * 20 > 50
                            ? "warning"
                            : "danger"
                        }
                        now={data.streaks * 20}
                      />

                      {/* <Card.Text
                      variant={x * 20 > 75 ? "success" : "danger"}
                      style={{ color: x * 20 > 75 ? "red" : "blue" }}
                    >
                      {x * 20}
                      </Card.Text> */}

                      <Card.Text>Maze Level: {data.mazeLvl}</Card.Text>

                      <ProgressBar
                        style={{ width: "10rem" }}
                        variant={
                          data.mazeLvl * 12.5 > 75
                            ? "success"
                            : data.mazeLvl * 12.5 > 50
                            ? "warning"
                            : "danger"
                        }
                        now={data.mazeLvl * 12.5}
                      />

                      <Card.Text>Reedemed points: {data.redeemedPts}</Card.Text>

                      <Card.Text>Total points: {data.totalPts}</Card.Text>
                    </Col>
                    <Col className="col-5">
                      {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}

                      <div style={{ marginTop: 60 }}>
                        <img
                          style={{
                            width: 80,
                            borderRadius: 100,
                            marginTop: -20,
                          }}
                          src={
                            performanceCal(
                              data.streaks,
                              TStreaks,
                              data.mazeLvl,
                              TMazeLvl,
                              mazeWeightage,
                              streakWeightage
                            ) > 70
                              ? "https://img.icons8.com/emoji/48/000000/grinning-face-with-big-eyes--v2.png"
                              : performanceCal(
                                  data.streaks,
                                  TStreaks,
                                  data.mazeLvl,
                                  TMazeLvl,
                                  mazeWeightage,
                                  streakWeightage
                                ) > 30
                              ? "https://img.icons8.com/emoji/48/000000/neutral-face.png"
                              : "https://img.icons8.com/emoji/48/000000/disappointed-face.png"
                          }
                          alt="doge"
                        />
                        <div style={{ marginTop: -5 }}>
                          <h6 style={{ fontSize: 10, marginTop: 9 }}>
                            Overall Performance:{" "}
                            {performanceCal(
                              data.streaks,
                              TStreaks,
                              data.mazeLvl,
                              TMazeLvl,
                              mazeWeightage,
                              streakWeightage
                            )}{" "}
                            %
                          </h6>
                          <strong>
                            {performanceCal(
                              data.streaks,
                              TStreaks,
                              data.mazeLvl,
                              TMazeLvl,
                              mazeWeightage,
                              streakWeightage
                            ) > 70
                              ? "Good"
                              : performanceCal(
                                  data.streaks,
                                  TStreaks,
                                  data.mazeLvl,
                                  TMazeLvl,
                                  mazeWeightage,
                                  streakWeightage
                                ) > 30
                              ? "Ok"
                              : "Bad"}
                          </strong>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
            .slice(0, visible)}
        </Row>

        {visible < numOfUser ? (
          <Button
            style={{ width: 100, marginLeft: 1300 }}
            lg="5"
            onClick={showMoreItems}
          >
            Load More
          </Button>
        ) : null}
      </Row>
    </div>
  );
}
