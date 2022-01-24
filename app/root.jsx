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
import { useSelector, useDispatch } from 'react-redux'
import { db } from "~/utils/db.server";
import { auth, authStatus, getUserId } from '~/utils/firebase';
import { Provider } from 'react-redux';
import store from './store';
import { getData } from "~/features/counterSlice";
import { onAuthStateChanged } from "firebase/auth";

export function meta() {
  return { title: "quizment" };
}

//   const studentID = useSelector(getData).payload.myStore.value;



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
  // const dispatch = useDispatch();
  async function fetchUserIDAndAuthStatus() {
    try {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          console.log(currentUser.uid)
          // dispatch()
          // // sets new state for uid of current user
          // dispatch(userID(currentUser.uid));
          // const stateuid = store.getState();
          // console.log(stateuid.myStore.value);
        }
      });
      if (data) {
        authStatus(data.userType.type);
      } else {
        authStatus(0);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUserIDAndAuthStatus();
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
