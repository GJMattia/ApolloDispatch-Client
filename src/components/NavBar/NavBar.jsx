import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import * as userService from "../../../utilities/user-services";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const panelRef = useRef(null);

  const toggleMenu = () => {
    setMenu((m) => {
      const next = !m;
      document.documentElement.style.overflowY = next ? "hidden" : "auto";
      return next;
    });
  };

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenu(false);
    };
    if (menu) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, []);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
    navigate("/");
  }

  const go = (path) => {
    navigate(path);
    setMenu(false);
    document.documentElement.style.overflowY = "auto";
  };

  return (
    <nav className="NavBar">
      <button
        className="NavBtn"
        onClick={toggleMenu}
        aria-expanded={menu}
        aria-controls="nav-dropdown"
        aria-label="Open menu"
      >
        <div className={`Slice ${menu ? "Slice1" : ""}`}></div>
        <div className={`Slice ${menu ? "Slice2" : ""}`}></div>
        <div className={`Slice ${menu ? "Slice3" : ""}`}></div>
      </button>

      <h3 className="ApolloDispatch" onClick={() => go("/")}>
        Apollo Dispatch
      </h3>

      {/* Keep your inline Log Out / Sign In for desktop */}
      {user ? (
        <h4 className="LogOption" onClick={handleLogOut}>
          Log Out
        </h4>
      ) : (
        <h4 className="LogOption" onClick={() => go("/login")}>
          Sign In
        </h4>
      )}

      {/* Animated dropdown + backdrop */}
      <AnimatePresence>
        {menu && (
          <>
            {/* Backdrop (click to close) */}
            <motion.button
              className="NavBackdrop"
              onClick={() => setMenu(false)}
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Dropdown panel that animates downward from the nav */}
            <motion.div
              id="nav-dropdown"
              ref={panelRef}
              className="NavDropdown"
              role="menu"
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="NavOptions" role="menubar">
                {user && (
                  <>
                    <li role="menuitem" onClick={() => go("/vehicles")}>
                      Vehicles
                    </li>
                    <li role="menuitem" onClick={() => go("/schedule")}>
                      Schedule
                    </li>
                    <li role="menuitem" onClick={() => go("/resources")}>
                      Resources
                    </li>
                  </>
                )}
                <li role="menuitem" onClick={() => go("/version")}>
                  Version (v0.55)
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
