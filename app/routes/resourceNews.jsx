import { Outlet } from "remix";
import { useEffect } from 'react';

import newResource from '~/styles/news.css'



export function links() {
  return [
    {
      rel: "stylesheet",
      href: newResource,
    },
  ];
}


export default function newsPage() {

  return (
   
    <div>
      <h1 >Resource news</h1>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}