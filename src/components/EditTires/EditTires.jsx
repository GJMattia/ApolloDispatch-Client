import "./EditTires.css";
import { updateTire } from "../../../utilities/vehicle-api";
import { useState } from "react";

export default function EditTires({
  selectedVehicle,
  setTireWindow,
  setVehicles,
}) {
  const [tire, setTire] = useState(selectedVehicle.tire);

  async function handleTire() {
    try {
      let response = await updateTire({
        vehicleID: selectedVehicle._id,
        tire: tire,
      });

      setVehicles((prev) =>
        prev.map((v) =>
          v._id === response.id || v.id === response.id
            ? { ...v, tire: response.tire, updatedAt: response.updatedAt }
            : v
        )
      );
      setTireWindow(false);
    } catch (error) {
      console.error("error updating tire", error);
    }
  }

  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>Update tire pressure info for {selectedVehicle.name}</h1>
        <div className="Tire">
          <h1
            onClick={() => setTire(true)}
            className={tire ? "active-yes" : ""}
          >
            ✅
          </h1>
          <h1
            onClick={() => setTire(false)}
            className={!tire ? "active-no" : ""}
          >
            ❌
          </h1>
        </div>
        <div className="SettingsBtns">
          <button
            onClick={() => setTireWindow((prev) => !prev)}
            className="SettingsBtn Cancel"
          >
            Cancel
          </button>
          <button onClick={handleTire} className="SettingsBtn">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
