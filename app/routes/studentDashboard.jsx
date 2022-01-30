import { Outlet } from "remix";
import stylesNav from '~/styles/nav.css';

export function meta() {
  return { title: "Student Dashboard" };
}

export function links() {
  return [{ rel: "stylesheet", href: stylesNav }];
}

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