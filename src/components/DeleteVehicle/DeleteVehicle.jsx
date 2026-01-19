import "./DeleteVehicle.css";
import { useState } from "react";
import { deleteVehicle } from "../../../utilities/vehicle-api/";

export default function EditTires({
  selectedVehicle,
  setDeleteVehicleWindow,
  setVehicles,
}) {
  async function handleDeleteVehicle() {
    try {
      let response = await deleteVehicle({
        vehicleID: selectedVehicle._id,
      });

      setVehicles((prev) =>
        prev.filter(
          (v) => v._id !== response.vehicleID && v.id !== response.vehicleID
        )
      );
      setDeleteVehicleWindow(false);
    } catch (error) {
      console.error("error updating tire", error);
    }
  }

  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>DELETE {selectedVehicle.name}?</h1>
        <h2 className="Red No">CAUTION! You cannot undo.</h2>
        <div className="SettingsBtns">
          <button
            className="SettingsBtn Cancel"
            onClick={() => setDeleteVehicleWindow(false)}
          >
            Cancel
          </button>
          <button className="SettingsBtn" onClick={handleDeleteVehicle}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
