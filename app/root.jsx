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

// export async function loader() {
//   const studentIDValue = await getUserId();
//   console.log("Yes" + studentIDValue);
//   if (studentIDValue) {
//     const data = {
//       userType: await db.user.findUnique({
//         where: {
//           uid: studentIDValue,
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
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      try {
        async function getUserType() {
          const userType = await db.user.findUnique({
            where: {
              uid: currentUser.uid,
            },
            select: {
              type: true
            }
          });
          if (userType !== null) {
            console.log("User Type successfully declared.");
            authStatus(userType);
          } else {
            console.log("User type is not defined")
            authStatus(0);
          }
        }
        getUserType();
      } catch (error) {
        console.log(error);
      }
    });
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
