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
      <h3 className="ApolloDispatch" onClick={() => navigate("/")}>
        Apollo Dispatch
      </h3>

      {user && (
        <ul className="NavOptions">
          <li onClick={() => navigate("/vehicles")}>Vehicles</li>
          <li onClick={() => navigate("/resources")}>Resources</li>
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
