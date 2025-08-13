import "./AccountPage.css";
import { useState } from "react";
import ProfilePics from "../../assets/data/profilepics.json";
import { useNavigate } from "react-router-dom";
import Edit from "../../assets/images/icons/edit.png";
import EditProfilePic from "../EditProfilePic/EditProfilePic";

export default function AccountPage({ user, setUser }) {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    epp: false,
    perks: false,
  });

  function formatDate(dateString) {
    const date = new Date(dateString);

    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${month}/${day}/${year}`;
  }

  const shouldBlur = Object.values(settings).includes(true);

  return (
    <div className="AccountPage">
      {settings.epp && (
        <EditProfilePic
          user={user}
          setUser={setUser}
          setSettings={setSettings}
        />
      )}

      <div className={`AccountGrid ${shouldBlur ? "Blur" : ""}`}>
        {user && (
          <>
            <div className="Profile">
              <h1>{user.name}</h1>
              <img
                className="EditProfilePic"
                src={Edit}
                onClick={() =>
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    epp: true,
                  }))
                }
              />
              <img
                className="EditPerks"
                src={Edit}
                onClick={() =>
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    perks: true,
                  }))
                }
              />
              <div className="ProfileBox">
                <img
                  className="ProfilePicture"
                  src={ProfilePics[user.pic].img}
                />
              </div>

              <p>Account Created on {formatDate(user.createdAt)}</p>
              <p>
                Birthday: {user.birthday.mm}/{user.birthday.dd}/
                {user.birthday.yyyy}
              </p>
              <p className={user.verified ? "Green" : ""}>
                Verified: {user.verified.toString()}
              </p>
              {!user.verified && (
                <>
                  <p className="Red">
                    Your account is not verified, some of your functions will be
                    limited.
                  </p>
                  <button
                    className="VerifyBtn"
                    onClick={() => navigate("/verify")}
                  >
                    Click here to verify your email address!
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
