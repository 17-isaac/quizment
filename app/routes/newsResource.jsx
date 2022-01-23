import { Outlet } from "remix";
import { useEffect } from 'react';
import {headingNews} from '~/styles/news.css'



export function links() {
  return [
    {
      rel: "stylesheet",
      href: headingNews,
    },
  ];
}


export default function newsResource() {

  return (
   
    <div>
      <h1 className="headingNews">News Resource</h1>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}