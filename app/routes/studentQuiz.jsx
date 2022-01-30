import { Outlet } from "remix";

export default function studentQuiz() {
  return (
    <div>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}