import "./EditPlate.css";
import { useState } from "react";
import { updatePlate } from "../../../utilities/vehicle-api.js";

export default function EditPlate({ selectedVehicle, setWindow, setVehicles }) {
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const [plate, setPlate] = useState(selectedVehicle.plate);

  async function handlePlate() {
    try {
      let response = await updatePlate({
        vehicleID: selectedVehicle._id,
        plate: plate,
      });

      setVehicles((prev) =>
        prev.map((v) =>
          v._id === response.id || v.id === response.id
            ? { ...v, plate: response.plate, updatedAt: response.updatedAt }
            : v,
        ),
      );

      setWindow(0);
    } catch (error) {
      console.error("error updating plate date", error);
    }
  }

  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>Update plate for {selectedVehicle.name}</h1>
        <div className="EditPlate">
          <div className="PlateInfo">
            <h4>Current Plate</h4>
            <select
              className="StateSelect"
              value={selectedVehicle.plate || ""}
              disabled
            >
              <option value={selectedVehicle.plate}>
                {selectedVehicle.plate}
              </option>
            </select>
          </div>
          <div className="PlateInfo">
            <h4>New Plate</h4>
            <select
              className="StateSelect"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
            >
              <option value="">Select State</option>

              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="SettingsBtns">
          <button onClick={() => setWindow(0)} className="SettingsBtn Cancel">
            Cancel
          </button>
          <button onClick={handlePlate} className="SettingsBtn">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
