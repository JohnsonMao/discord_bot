import { useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (pathname === '/') navigate("/login");
  }, [navigate, pathname]);

  return (
    <div>
      <h1>Root layout</h1>
      <Outlet />
    </div>
  );
}
