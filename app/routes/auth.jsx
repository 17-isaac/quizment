import { Outlet } from "remix";

export default function Auth() {
  return (
    <div>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}