import { redirect, useLoaderData } from "remix";
import { useState } from "react";
import { getSession, destroySession } from "~/sessions.server";
import { db } from "~/utils/db.server";
import { auth } from '~/utils/firebase';
import { signOut } from "firebase/auth";
import { NavigationTeacher } from '~/components/navTeacher';

export function links() {
  return [{
    rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
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
          type: true
        }
      })
    };
    return data;
  } else {
    return redirect('/auth');
  }
};

export default function TeacherDashboardContent() {
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
        <NavigationTeacher onClick={handleClick} />
      </div>
      <p></p>
      { displayDashboard &&
        <div className="content">
          <div className="title">
            Teacher Fullscreen Overlay Navigation Bar
       </div>
          <p>
            using only HTML & CSS
       </p>
        </div>
      }
    </div>
  );
}