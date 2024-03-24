import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <div>{t("detail")}</div>
      <div>Detail Page</div>
      <Link to="/login">{t("logout")}</Link>
    </>
  );
}
