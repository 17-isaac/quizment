import { Outlet } from "remix";

export default function mapOfMaze() {
  return (
    <div>
      <h1>Map Of Maze</h1>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}