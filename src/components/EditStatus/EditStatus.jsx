import "./EditStatus.css";
import { updateStatus } from "../../../utilities/vehicle-api";
import { useState } from "react";

export default function EditStatus({
  selectedVehicle,
  setStatusWindow,
  setVehicles,
}) {
  const [status, setStatus] = useState(selectedVehicle.status);

  async function handleStatus() {
    try {
      let response = await updateStatus({
        vehicleID: selectedVehicle._id,
        status: status,
      });

      setVehicles((prev) =>
        prev.map((v) =>
          v._id === response.id || v.id === response.id
            ? { ...v, status: response.status }
            : v
        )
      );
      setStatusWindow(false);
    } catch (error) {
      console.error("error updating drive status", error);
    }
  }
  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>Update drive status for {selectedVehicle.name}</h1>

        <div className="Tire">
          <h1
            onClick={() => setStatus(0)}
            className={status === 0 ? "active-yes" : ""}
          >
            ✅
          </h1>
          <h1
            onClick={() => setStatus(1)}
            className={status === 1 ? "active-warn" : ""}
          >
            ⚠️
          </h1>
          <h1
            onClick={() => setStatus(2)}
            className={status === 2 ? "active-no" : ""}
          >
            ❌
          </h1>
        </div>
        <div className="SettingsBtns">
          <button
            onClick={() => setStatusWindow((prev) => !prev)}
            className="SettingsBtn Cancel"
          >
            Cancel
          </button>
          <button onClick={handleStatus} className="SettingsBtn">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
