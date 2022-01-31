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
      <main>
        <Outlet/>
      </main>
    </div>
  );
}