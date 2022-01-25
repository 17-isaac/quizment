import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "remix";
import { useState, useEffect } from 'react';
import { db } from "~/utils/db.server";
import { auth, authStatus, getUserId } from '~/utils/firebase';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';
import { getData } from "~/features/counterSlice";
import { onAuthStateChanged } from "firebase/auth";

export function meta() {
  return { title: "quizment" };
}

//   const studentID = useSelector(getData).payload.myStore.value;
// let userIDValue;

// export async function loader() {
//   console.log("Yes" + userIDValue);
//   if (userIDValue) {
//     const data = {
//       userType: await db.user.findUnique({
//         where: {
//           uid: userIDValue,
//         },
//         select: {
//           type: true
//         }
//       }),
//     };
//     console.log(data.userType.type);
//     return data;
//   } else {
//     return null;
//   }
// };


export default function App() {
  // const data = useLoaderData();
  const dispatch = useDispatch();
  const [userid, setUserId] = useState("");
  const [userType, setUserType] = useState(0);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser.uid);
        setUserId(currentUser.uid);
        dispatch(getData(userid));
        console.log(userid);
        // setUserType(data.type);
        authStatus(userType);
      } else {
        authStatus(userType);
      }
    });
    // if (data) {
    //   authStatus(data.userType.type);
    // } else {
    //   authStatus(0);
    // }
  });

  // console.log(userid);
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
