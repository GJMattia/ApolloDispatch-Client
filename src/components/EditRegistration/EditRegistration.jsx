import "./EditRegistration.css";
import { useState } from "react";
import { getDateClass } from "../../../utilities/helpful-functions.js";
import { updateRegistration } from "../../../utilities/vehicle-api.js";

export default function EditRegistration({
  selectedVehicle,
  setRegistrationWindow,
  setVehicles,
}) {
  const [registration, setRegistration] = useState(
    selectedVehicle.registration
  );

  async function handleRegistration() {
    try {
      let response = await updateRegistration({
        vehicleID: selectedVehicle._id,
        registration: registration,
      });

      setVehicles((prev) =>
        prev.map((v) =>
          v._id === response.id || v.id === response.id
            ? {
                ...v,
                registration: response.registration,
                updatedAt: response.updatedAt,
              }
            : v
        )
      );

      setRegistrationWindow(false);
    } catch (error) {
      console.error("error updating registration date", error);
    }
  }

  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>Update registration date for {selectedVehicle.name}</h1>
        <div className="EditRegistration">
          <div className="RegistrationInfo">
            <h4>Current Expiration Date</h4>
            <input
              className="DateInput No"
              type="date"
              value={
                selectedVehicle.registration
                  ? new Date(selectedVehicle.registration)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              readOnly
            />
            <h3 className={getDateClass(selectedVehicle.registration)}>
              {new Date(selectedVehicle.registration).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  year: "numeric",
                }
              )}
            </h3>
          </div>
          <div className="RegistrationInfo">
            <h4>New Expiration Date</h4>
            <input
              className="DateInput"
              type="date"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
            />
            <h3 className={getDateClass(registration)}>
              {" "}
              {new Date(registration).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h3>
          </div>
        </div>
        <div className="SettingsBtns">
          <button
            onClick={() => setRegistrationWindow((prev) => !prev)}
            className="SettingsBtn Cancel"
          >
            Cancel
          </button>
          <button onClick={handleRegistration} className="SettingsBtn">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
