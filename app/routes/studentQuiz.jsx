import { Outlet } from "remix";

export default function studentQuiz() {
  return (
    <div>
      <h1>Quiz</h1>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}