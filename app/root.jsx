import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  json,
  useLocation,
  useNavigate,
  useCatch,
  redirect
} from "remix";
import { useState, useEffect } from 'react';
import { db } from "~/utils/db.server";
import { getSession, commitSession } from "./sessions.server";
import { auth, authStatus, getUserId } from '~/utils/firebase';
import store from './store';
import { getData } from "~/features/counterSlice";
import ReactNotification from 'react-notifications-component';
import styles1 from '~/styles/error.css';
import styles2 from 'react-notifications-component/dist/theme.css';
import { io } from 'socket.io-client';

export function meta() {
  return { title: "quizment" };
}

export function links() {
  return [
    { rel: "stylesheet", href: styles1 },
    { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" },
    { rel: "stylesheet", href: styles2 }];
}

// loader function to check for existing user based on session cookie
// this is used to change the nav rendered on the page and the greeting. 
export async function loader({ request }) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  if (session.has("access_token") && auth.currentUser != null) {
    const data = {
      userType: await db.user.findUnique({
        where: {
          uid: auth.currentUser.uid,
        },
        select: {
          type: true
        }
      }),
      error: session.get("error")
    };
    return json(data, {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  } else {
    if (meta().title == 'quizment' || meta().title == 'Sign In' || meta().title == 'Sign Up' || meta().title == 'Forget Password') {
      console.log("Not Signed In.");
      return null;
    } else {
      console.log("Access Denied");
      return redirect('/auth');
    }
  }
}


export default function App() {
  const data = useLoaderData();
  let location = useLocation();
  useEffect(() => {
    const socket = io(location);
    if (data) {
      authStatus(data.userType.type);
    }
  });

  // console.log(userid);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script src="/socket.io/socket.io.js"></script>
        <script>
          const socket = io();
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-modal/3.14.3/react-modal.min.js"
          integrity="sha512-MY2jfK3DBnVzdS2V8MXo5lRtr0mNRroUI9hoLVv2/yL3vrJTam3VzASuKQ96fLEpyYIT4a8o7YgtUs5lPjiLVQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"></script>
      </head>
      <body>
      <ReactNotification />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
