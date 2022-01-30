

import { Outlet } from "remix";


export default function TeacherViewStudentProgress() {



  return (
    <div>
      <h1>Student Progress</h1>
      <div id="alan-btn"></div>
   
      <main>
        <Outlet/>
      </main>
    </div>
  );
}