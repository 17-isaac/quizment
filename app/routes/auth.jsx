import { Outlet } from "remix";

export default function Auth() {
  return (
    <div>
      <h1></h1>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}