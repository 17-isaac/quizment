
import { Outlet } from "remix";
// import { useEffect } from 'react';

export default function TeacherViewStudentProgress() {


//   useEffect(() => {
//     const alanBtn = require("@alan-ai/alan-sdk-web");
//     alanBtn({
//     key: "b1283306f4a5fd0478ce1ceec798da192e956eca572e1d8b807a3e2338fdd0dc/stage",
//     onCommand: ({ command }) =>{
//         if(command === 'testCommand'){
//             alert('this code was executed')
//         }
//     }
//    });
//  }, []);
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
