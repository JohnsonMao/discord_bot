import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <h1>Private Layout</h1>
      <Outlet />
    </div>
  );
}
