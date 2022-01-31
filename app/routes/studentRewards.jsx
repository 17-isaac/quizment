import { Outlet} from "remix";

export function meta() {
  return { title : 'Student Rewards' }
}

export default function studentRewards() {

  return (
    <div>
      <h1>Rewards</h1>
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}