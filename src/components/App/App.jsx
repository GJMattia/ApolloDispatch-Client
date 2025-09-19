import "./App.css";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../../utilities/user-services";
import AuthPage from "../Auth/AuthPage/AuthPage";
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import Verify from "../Verify/Verify";
import Vehicles from "../Vehicles/Vehicles";
import Resources from "../Resources/Resources";
import Version from "../Version/Version";
import Schedule from "../Schedule/Schedule";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/vehicles"
            element={
              user ? <Vehicles user={user} /> : <Navigate to="/" replace />
            }
          />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
          <Route
            path="/verify"
            element={<Verify user={user} setUser={setUser} />}
          />
          <Route
            path="/resources"
            element={user ? <Resources /> : <Navigate to="/" replace />}
          />
          <Route path="/version" element={<Version />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
