import { Outlet } from "remix";
import React from "react";

export default function search() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
