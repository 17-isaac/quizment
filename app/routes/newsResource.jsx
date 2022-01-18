import { Outlet } from "remix";
import { useEffect } from 'react';
export default function newsResource() {

  return (
   
    <div>
      <h1>News Resource</h1>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}