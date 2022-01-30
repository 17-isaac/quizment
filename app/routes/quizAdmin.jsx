import { Outlet } from "remix";

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