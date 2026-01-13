import "./EditFluid.css";
import { useState } from "react";
import { updateFluid } from "../../../utilities/vehicle-api";

export default function EditFluid({
  selectedVehicle,
  setFluidWindow,
  setVehicles,
}) {
  const [fluid, setFluid] = useState(selectedVehicle.fluid);

  async function handleFluid() {
    try {
      let response = await updateFluid({
        vehicleID: selectedVehicle._id,
        fluid: fluid,
      });

      setVehicles((prev) =>
        prev.map((v) =>
          v._id === response.id || v.id === response.id
            ? { ...v, fluid: response.fluid, updatedAt: response.updatedAt }
            : v
        )
      );
      setFluidWindow(false);
    } catch (error) {
      console.error("error updating fluid", error);
    }
  }
  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>Update wiper fluid info for {selectedVehicle.name}</h1>
        <div className="Fluid">
          <h1
            onClick={() => setFluid(true)}
            className={fluid ? "active-yes" : ""}
          >
            ✅
          </h1>
          <h1
            onClick={() => setFluid(false)}
            className={!fluid ? "active-no" : ""}
          >
            ❌
          </h1>
        </div>
        <div className="SettingsBtns">
          <button
            onClick={() => setFluidWindow((prev) => !prev)}
            className="SettingsBtn Cancel"
          >
            Cancel
          </button>
          <button onClick={handleFluid} className="SettingsBtn">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
