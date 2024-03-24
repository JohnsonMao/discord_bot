import { Link } from "react-router-dom";

export default function Page() {
  return (
    <>
      <div>Detail Page</div>
      <Link to="/login">Logout</Link>
    </>
  );
}
