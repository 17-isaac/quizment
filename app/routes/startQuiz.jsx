import { Outlet } from "remix";

export default function startQuiz() {
  return (
    <div>
      <h1>Quiz start</h1>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}