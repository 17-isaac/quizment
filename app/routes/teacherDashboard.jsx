import { Outlet } from "remix";
import stylesNav from '~/styles/nav.css';

export function meta() {
  return { title: "Teacher Dashboard" };
}

export function links() {
  return [{ rel: "stylesheet", href: stylesNav }];
}


export default function TeacherDashboard() {
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}