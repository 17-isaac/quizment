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
import { authStatus, getUserId } from '~/utils/firebase';
import { Provider } from 'react-redux';
import store from './store';
import { getData } from "~/features/counterSlice";

export function meta() {
  return { title: "quizment" };
}



export async function loader({request}) {
  const studentIDValue = await getUserId(request);
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
    if (data) {
      authStatus(data.userType.type);
    } else {
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
