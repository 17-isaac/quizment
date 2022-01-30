
import { Outlet } from "remix";

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
    
      <main>
        <Outlet/>
      </main>
    </div>
  );
}