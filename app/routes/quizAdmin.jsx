import { Outlet } from "remix";
import stylesNav from '~/styles/nav.css';

export function meta() {
  return { title: "Quiz Admin (Teacher)" };
}

export function links() {
  return [{ rel: "stylesheet", href: stylesNav }];
}

export default function quizAdmin() {
  return (
    <div>
      <h1>Quiz Admin</h1>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}