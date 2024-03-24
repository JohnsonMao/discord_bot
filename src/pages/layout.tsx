import { useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    if (pathname === '/') navigate("/login");
  }, [navigate, pathname]);

  return (
    <div>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <button onClick={() => i18n.changeLanguage('zh-TW')}>中文</button>
      <h1>Root layout</h1>
      <Outlet />
    </div>
  );
}
