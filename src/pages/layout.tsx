import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <h1>Root layout</h1>
      <Outlet />
    </div>
  );
}
