import { Outlet } from "remix";

export default function teacherRewardsAdd() {
  return (
    <div>
      <h1>Teacher Rewards</h1>
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}