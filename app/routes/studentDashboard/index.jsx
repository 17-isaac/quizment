import { redirect, useLoaderData, Link } from "remix";
import { useState } from "react";
import { getSession, destroySession } from "~/sessions.server";
import { db } from "~/utils/db.server";
import { auth } from '~/utils/firebase';
import { signOut } from "firebase/auth";
import { NavigationStudent } from '~/components/navStudent'
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SizeMe } from 'react-sizeme';
import dashboardStyles from '~/styles/studentDashboard.css';


export function links() {
  return [{
    rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
    rel: "stylesheet", href: dashboardStyles
  }];
}
export let action = async ({ request }) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  if (session.has("access_token")) {
    await signOut(auth);
    return redirect("/auth", {
      headers: { "Set-Cookie": await destroySession(session) }
    })
  }
}

export async function loader() {
  if (auth.currentUser) {
    const currentUserID = auth.currentUser.uid;
    const data = {
      studentUserData: await db.user.findUnique({
        where: {
          uid: currentUserID,
        },
        select: {
          name: true
        }
      }),
      studentDetails: await db.student.findUnique({
        where: {
          uid: currentUserID
        },
        select: {
          streaks: true,
          totalPts: true,
          redeemedPts: true
        }
      }),
      leaderboardData: await db.student.findMany({
        take: 10,
        orderBy: {
          totalPts: 'desc'
        },
        select: {
          name: true,
          totalPts: true
        }
      })
    };
    return data;
  } else {
    return redirect('/auth');
  }
};


export default function StudentDashboardContent() {
  const [clickStatus, setClickStatus] = useState(0);
  const [displayDashboard, setDisplayDashboardStatus] = useState(true);
  function handleClick() {
    if (clickStatus === 0) {
      setClickStatus(1);
      setDisplayDashboardStatus(false);
    } else {
      setClickStatus(0);
      setDisplayDashboardStatus(true);
    }
  }
  return (
    <div>
      <div>
        <NavigationStudent onClick={handleClick} />
      </div>
      <p></p>
      { displayDashboard &&
        <div className="content">
          <StudentDashboardLayout />
        </div>
      }
    </div>
  );
}

export function StudentDashboardLayout() {
  const data = useLoaderData();
  const layouts = {
    lg: [
      { i: 'a', x: 0, y: 0, w: 3, h: 2 },
      { i: 'b', x: 1, y: 0, w: 3, h: 4 },
      { i: 'c', x: 4, y: 3, w: 4, h: 4 },
      { i: 'd', x: 4, y: 2, w: 3, h: 4 },
      { i: "e", x: 0, y: 3, w: 4, h: 4 },
      { i: "f", x: 7, y: 0, w: 4, h: 4 },
      { i: "g", x: 8, y: 2, w: 4, h: 5 },
    ],
  };
  function createData(name, points) {
    return { name, points };
  }
  // const rows = [
  //   createData(data.leaderboardData[0].name, data.leaderboardData[0].totalPts.toString()),
  //   createData(data.leaderboardData[1].name, data.leaderboardData[1].totalPts.toString()),
  //   createData(data.leaderboardData[2].name, data.leaderboardData[2].totalPts.toString()),
  //   createData(data.leaderboardData[3].name, data.leaderboardData[3].totalPts.toString()),
  //   createData(data.leaderboardData[4].name, data.leaderboardData[4].totalPts.toString()),
  //   createData(data.leaderboardData[5].name, data.leaderboardData[5].totalPts.toString()),
  //   createData(data.leaderboardData[6].name, data.leaderboardData[6].totalPts.toString()),
  //   createData(data.leaderboardData[7].name, data.leaderboardData[7].totalPts.toString()),
  //   createData(data.leaderboardData[8].name, data.leaderboardData[8].totalPts.toString()),
  //   createData(data.leaderboardData[9].name, data.leaderboardData[9].totalPts.toString()),
  // ];
  return (
    <SizeMe refreshMode="debounce"
      refreshRate={60}
      render={({ size }) =>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={60}
          width={size.width}
        >
          <div key="a">
            <Paper className="boxContentDashboard" id="a" elevation={24} sx={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, rgba(67,61,163,1) 0%, rgba(77,77,173,1) 35%, rgba(3,138,206,1) 81%) !important' }}>
              <p>Hi {data.studentUserData.name}!</p>
              <p>Redeemable Points: {data.studentDetails.redeemedPts.toString()}</p>
              <p>Total Points Earned: {data.studentDetails.totalPts.toString()}</p>
            </Paper>
          </div>
          <div key="b">
            <Paper className="boxContentDashboard" id="b" elevation={24} sx={{ width: '100%', height: '100%', background: 'radial-gradient(#f588d8, #c0a3e5) !important' }}>
              <p>Quiz</p>
              <p>Do your quizzes!</p>
              <p>Apart from sharpening your skills you will be able to earn the points that you can use to redeem stuff!</p>
              <Link className={'linkForDashboards'} to="/studentQuiz" style={{ textDecoration: 'none' }}><p>Click here to do quizzes.</p></Link>
            </Paper>
          </div>
          <div key="c">
            <Paper className="boxContentDashboard" id="c" elevation={24} sx={{ width: '100%', height: '100%', background: 'radial-gradient(#fbc1cc, #fa99b2) !important' }}>
              <p>Q Search</p>
              <p>Our very own Q search! An easy way to get information that you need for your studies!</p>
              <Link className={'linkForDashboards'} to="/search" style={{ textDecoration: 'none' }}><p>Click here to go Q searching!</p></Link>
            </Paper>
          </div>
          <div key="d">
            <Paper className="boxContentDashboard" id="d" elevation={24} sx={{ width: '100%', height: '100%', background: 'radial-gradient(#76b2fe, #b69efe) !important' }}>
              <p>Resource News</p>
              <p>Get updated with the lastest news on your subjects that you need to learn about!</p>
              <Link className={'linkForDashboards'} to="/resourceNews" style={{ textDecoration: 'none' }}><p>Click here to go to Resource News!</p></Link>
            </Paper>
          </div>
          <div key="e">
            <Paper className="boxContentDashboard" id="e" elevation={24} sx={{ width: '100%', height: '100%', background: 'linear-gradient(228deg, rgba(34,193,195,1) 0%, rgba(57,149,49,1) 71%, rgba(141,189,44,1) 100%) !important' }}>
              <p>Leaderboard</p>
              <p>The top 10 students!</p>
              {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer> */}
            </Paper>
          </div>
          <div key="f">
            <Paper className="boxContentDashboard" id="f" elevation={24} sx={{ width: '100%', height: '100%', background: 'linear-gradient(306deg, rgba(34,193,195,1) 0%, rgba(45,191,253,1) 100%) !important' }}>
              <p>Rewards</p>
              <p>Have enough points? Redeem whatever rewards that you like! From pencil cases to toys we have it all.</p>
              <Link className={'linkForDashboards'} to="/rewards" style={{ textDecoration: 'none' }}><p>Click here to go to redeem rewards!</p></Link>
            </Paper>
          </div>
          <div key="g">
            <Paper className="boxContentDashboard" id="g" elevation={24} sx={{ width: '100%', height: '100%', background: 'linear-gradient(32deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%) !important' }}>
              <p>Streaks</p>
              <p>{data.studentDetails.streaks.toString()} day streak</p>
              <p>Ways to improve your streak?</p>
              <p>All you need to do is to use quizment daily and your streak will increase! Constant daily practice of your subjects will also help you to get better grades and have an easier time at school. Always remember to have fun!</p>
            </Paper>
          </div>
        </ResponsiveGridLayout>
      } />
  );
}

export function ErrorBoundary({ error }) {
  return (
    <div>
      <p>{error.message}</p>
    </div>
  )
}