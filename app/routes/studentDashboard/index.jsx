import { redirect, useLoaderData } from "remix";
import { useEffect, useState } from "react";
import { getSession, destroySession } from "~/sessions.server";
import { db } from "~/utils/db.server";
import { auth } from '~/utils/firebase';
import { signOut } from "firebase/auth";
import { NavigationStudent } from '~/components/navStudent'
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
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
    const data = {
      studentDetailsData: await db.user.findUnique({
        where: {
          uid: auth.currentUser.uid,
        },
        select: {
          name: true,
          type: true,
          totalPts:true,
          redeemedPts:true,
  
          streaks: true,
        
        }
      }),
      studentOtherData: await db.student.findUnique({
        where: {
          uid: auth.currentUser.uid,
        },
        select: {
          name: true,
          streaks: true
        }
      }),
   
    };


    const currentLogin = new Date().getTime();

    let lastLog = data.studentDetailsData.lastLogin.toString();
    let name = data.studentDetailsData.name;
    let totalPts=data.studentDetailsData.totalPts
    let redeemedPts=data.studentDetailsData.redeemedPts
    let streaks = data.studentDetailsData.streaks;
    let diffTime = currentLogin - lastLog;

    
  if (diffTime >= 28800000 && diffTime <= 86400000) {
    console.log("Streak up");
    //   await db.student.update({
    //   where: {
    //     name: data.studentDetailsData.name,
    //   },
    //   data: {
    //     streaks:data.studentDetailsData.streaks +1
    //   },
    // })
  } else if (diffTime > 86400000) {
    console.log("streak 0");
    // await db.student.update({
    //   where: {
    //     name: data.studentDetailsData.name,
    //   },
    //   data: {
    //     streaks: 0,
    //   },
    // });
  } else {
    console.log("Remain the sameeeee");

    console.log("executed");
  }


  let allData = {
    lastLogin: lastLog,
    sName: name,
    sStreaks: streaks,
    totalPoints:totalPts,
    rPts:redeemedPts
  };


     return allData;;
  } else {
    return redirect('/auth');
  }
};


export default function StudentDashboardContent() {
  const [clickStatus, setClickStatus] = useState(0);
  const [displayDashboard, setDisplayDashboardStatus] = useState(true);
  const data = useLoaderData();

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

  const originalItems = ["a", "b", "c", "d", "e", "f", "g"];
  const initialLayouts = {
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

  const [items, setItems] = useState(originalItems);
  const [layouts, setLayouts] = useState(
    initialLayouts
  );

  return (

    <div>
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
          {items.map((key) => (
            <div
              key={key}
              className="widget"
              data-grid={{ w: 3, h: 2, x: 0, y: Infinity }}
            >
              <Widget
                id={key}
                backgroundColor="#F3C3B0"
              />
            </div>
          ))}
          {/* <div key="a">
            <Widget id="a" backgroundColor="#867ae9" />
          </div>
          <div key="b">
            <Widget id="b" backgroundColor="#fff5ab" />
          </div>
          <div key="c">
            <Widget id="c" backgroundColor="#ffcead" />
          </div>
          <div key="d">
            <Widget id="d" backgroundColor="#c449c2" />
          </div>
          <div key="e">
            <Widget id="e" backgroundColor="#c449c2" />
          </div>
          <div key="f">
            <Widget id="f" backgroundColor="#c449c2" />
          </div> */}
        </ResponsiveGridLayout>
      
      } />
        <div>
      <p>Name: {data.sName}</p>

      <p>Total points: {data.totalPoints}</p>
      <p>Redeemable points:{data.rPts}</p>

      <p>Streaks: {data.sStreaks}</p>

    
    </div>
        </div>
  );
}

function Widget({ id, backgroundColor }) {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor }}>{id}

    </div>
  );
}


