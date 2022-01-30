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

//import sylesheet
import performanceCal from "~/components/algorithm/performanceCal";
//links for styling
export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
  ];
}



export async function loader() {

  //load data from database
  const data = {
    //student performance information retrieved orderd by descending streaks value
    studentPerformanceDetails: await db.student.findMany({
      select: {
        name: true,
        Uid: true,
        streaks: true,
    
        totalPts: true,
        redeemedPts: true,
      },
      orderBy: { streaks: "desc" },
    }),
// get the highest points that is obtained by students
    studentTotalMaxPts: await db.student.aggregate({
      _max: {
        totalPts: true,
      },
    }),
// get the highest streaks that is taken
    studentStreaksMax: await db.student.aggregate({
      _max: {
        streaks: true,
      },
    }),

 //get the total number of students
    userCount: await db.student.count(),
  };

  return data;
}

export default function teacherViewStudentProgressContent() {

  const data = useLoaderData();




  //destructure methods from useLoaderData
  const { studentPerformanceDetails, userCount } = useLoaderData();

  //declare a const for userCount
  const numOfUser = userCount;
// using state variable visible to limit number of data 
  const [visible, setVisible] = useState(3);

  //showMoreItems function to show 3 more data as teacher clicks more
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };
;
  // streakWeightage,ptsWeightage,highPts,highStreak along with total points and streaks of every student is used to
  // calculate the total performance
  const streakWeightage = 50;
  const ptsWeightage = 50;

  var highPts=data.studentTotalMaxPts._max.totalPts;

  var highStreak=data.studentStreaksMax._max.streaks;

  
  

  return (
    <div>
     


{/* dropdown for navigation */}

      
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
        
        </DropdownButton>
      </Row>

      
{/*  a map function to show student performace insights */}
      <Row>
        <Row lg="4">

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
                              data.totalPts,
                              highPts,
                              data.streaks,
                              highStreak,
                              ptsWeightage,
                              streakWeightage
                            ) > 70
                              ? "https://img.icons8.com/emoji/48/000000/grinning-face-with-big-eyes--v2.png"
                              : performanceCal(
                                data.totalPts,
                                highPts,
                                data.streaks,
                                highStreak,
                                ptsWeightage,
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
                             data.totalPts,
                             highPts,
                             data.streaks,
                             highStreak,
                             ptsWeightage,
                             streakWeightage
                            )}{" "}
                            %
                          </h6>
                          <strong>
                            {performanceCal(
                            data.totalPts,
                            highPts,
                            data.streaks,
                            highStreak,
                            ptsWeightage,
                            streakWeightage
                            ) > 70
                              ? "Good"
                              : performanceCal(
                                data.totalPts,
                              highPts,
                              data.streaks,
                              highStreak,
                              ptsWeightage,
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
