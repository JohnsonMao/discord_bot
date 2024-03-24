import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <div>Login Page</div>
      <Link to="/detail">{t("login")}</Link>
    </>
  );
}
