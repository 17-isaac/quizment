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
import { db } from "~/utils/db.server";
import { authStatus } from '~/utils/firebase';
import { Provider } from 'react-redux';
import store from './store';

export function meta() {
  return { title: "quizment" };
}

export async function loader() {
  const data = {
    userType: await db.student.findUnique({
      where: {
        studentID: 22,
      },
      select: {
        type: true
      }
    }),
  };
  console.log(data.userType.type);
  return data;
};

export default function App() {
  const data = useLoaderData();
  useEffect(() => {
    authStatus(data.userType.type);
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
