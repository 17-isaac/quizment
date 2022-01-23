import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "remix";
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { db } from "~/utils/db.server";
import { onAuthStateChanged } from "firebase/auth";
import { auth, authStatus } from '~/utils/firebase';
import { Provider } from 'react-redux';
import store from './store';
import { getData } from "~/features/counterSlice";

export function meta() {
  return { title: "quizment" };
}

// function studentIDSelector() {
//   const currentState = useSelector(getData).payload.myStore.value;
//   return currentState;
// }

// getting id of user 
async function getUserId() {
  let uid;
  return new Promise((resolve, reject) => {
    const getCurrentUserID = onAuthStateChanged(auth, (currentUser) => {
      try {
        if (currentUser) {
          uid = currentUser.uid;
          console.log("YES");
          resolve(uid);
        } else {
          uid = 0;
          console.log("User type not defined");
          resolve(uid);
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(JSON.stringify(errorCode));
        console.log(JSON.stringify(errorMessage));
      }
      getCurrentUserID();
    });
  });
}

export async function loader() {
  const studentIDValue = await getUserId();
  console.log("Yes" + studentIDValue);
  if (studentIDValue) {
    const data = {
      userType: await db.user.findUnique({
        where: {
          uid: studentIDValue,
        },
        select: {
          type: true
        }
      }),
    };
    console.log(data.userType.type);
    return data;
  } else {
    return null;
  }
};

export default function App() {
  const data = useLoaderData();
  useEffect(() => {
    if (data !== null) {
      authStatus(data.userType.type);
    } else {
      console.log("yes")
      authStatus(0);
    }
  });
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </Provider>
      </body>
    </html>
  );
}
