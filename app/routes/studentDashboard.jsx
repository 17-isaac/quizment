import { Outlet } from "remix";
import { useEffect } from 'react';
export default function StudentDashboard() {

  return (
   
    <div>
      <h1>Student Dashboard</h1>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}