import "./Footer.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="Footer">
      <p onClick={() => navigate("/version")}>v1.3</p>
    </footer>
  );
}
