import "./EditVin.css";
import { useState } from "react";
import { updateVin } from "../../../utilities/vehicle-api.js";

export default function EditVin({ selectedVehicle, setWindow, setVehicles }) {
  const [vin, setVin] = useState(selectedVehicle.vin || "");

  async function handleVin() {
    try {
      let response = await updateVin({
        vehicleID: selectedVehicle._id,
        vin: vin,
      });
      setVehicles((prev) =>
        prev.map((v) =>
          v._id === response.id || v.id === response.id
            ? { ...v, vin: response.vin, updatedAt: response.updatedAt }
            : v,
        ),
      );

      setWindow(0);
    } catch (error) {
      console.error("error updating vin date", error);
    }
  }

  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>Update VIN for {selectedVehicle.name}</h1>

        <div className="EditVin">
          <div className="VinBox">
            <h4>Current VIN</h4>
            <input
              type="text"
              value={selectedVehicle.vin}
              readOnly
              className="VinInput"
            />
          </div>
          <div className="VinBox">
            <h4>Enter VIN</h4>
            <input
              className="VinInput"
              minLength={4}
              maxLength={17}
              placeholder="Enter VIN"
              onChange={(e) => setVin(e.target.value)}
            />
          </div>
        </div>
        <div className="SettingsBtns">
          <button onClick={() => setWindow(0)} className="SettingsBtn Cancel">
            Cancel
          </button>
          <button onClick={handleVin} className="SettingsBtn">
            Update VIN
          </button>
        </div>
      </div>
    </div>
  );
}
