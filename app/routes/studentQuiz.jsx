import { Outlet } from "remix";

export function meta() {
  return { title: "Student Quiz" };
}

export default function studentQuiz() {
  return (
    <div>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}