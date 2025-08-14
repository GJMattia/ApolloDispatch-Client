import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../../utilities/user-services";
import AuthPage from "../Auth/AuthPage/AuthPage";
import NavBar from "../NavBar/NavBar";
// import AccountPage from "../AccountPage/AccountPage";
import Home from "../Home/Home";
import Verify from "../Verify/Verify";
// import Feed from "../Feed/Feed";
import Vehicles from "../Vehicles/Vehicles";
import Test from "../Test/Test";
import "./App.css";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route
            path="/account"
            element={<AccountPage user={user} setUser={setUser} />}
          /> */}

          {/* <Route path="/feed" element={<Feed user={user} />} /> */}
          <Route path="/vehicles" element={<Vehicles user={user} />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
          <Route
            path="/verify"
            element={<Verify user={user} setUser={setUser} />}
          />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
