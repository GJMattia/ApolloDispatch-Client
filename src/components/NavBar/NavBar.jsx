import { useNavigate } from "react-router-dom";
import * as userService from "../../../utilities/user-services";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    userService.logOut();
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="NavBar">
      <h1 className="ApolloDispatch" onClick={() => navigate("/")}>
        Apollo Dispatch
      </h1>

      {user && (
        <ul className="NavOptions">
          <li onClick={() => navigate("/resources")}>Resources</li>
          <li onClick={() => navigate("/vehicles")}>Vehicles</li>
        </ul>
      )}

      {user ? (
        <h4 className="LogOption" onClick={handleLogOut}>
          Log Out
        </h4>
      ) : (
        <h4 onClick={() => navigate("/login")}>Sign In</h4>
      )}
    </nav>
  );
}
