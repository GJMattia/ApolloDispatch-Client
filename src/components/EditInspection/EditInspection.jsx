import "./EditInspection.css";
import { useState } from "react";
import { getDateClass } from "../../../utilities/helpful-functions.js";
import { updateInspection } from "../../../utilities/vehicle-api.js";

export default function EditInspection({
  selectedVehicle,
  setWindow,
  setVehicles,
}) {
  const [inspection, setInspection] = useState(selectedVehicle.inspection);

  async function handleInspection() {
    try {
      let response = await updateInspection({
        vehicleID: selectedVehicle._id,
        inspection: inspection,
      });

      setVehicles((prev) =>
        prev.map((v) =>
          v._id === response.id || v.id === response.id
            ? {
                ...v,
                inspection: response.inspection,
                updatedAt: response.updatedAt,
              }
            : v,
        ),
      );

      setWindow(0);
    } catch (error) {
      console.error("error updating inspection date", error);
    }
  }

  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>Update inspection date for {selectedVehicle.name}</h1>
        <div className="EditInspection">
          <div className="InspectionInfo">
            <h4>Current Expiration Date</h4>
            <input
              className="DateInput No"
              type="date"
              value={
                selectedVehicle.inspection
                  ? new Date(selectedVehicle.inspection)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              readOnly
            />
            <h3 className={getDateClass(selectedVehicle.inspection)}>
              {new Date(selectedVehicle.inspection).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  year: "numeric",
                },
              )}
            </h3>
          </div>
          <div className="InspectionInfo">
            <h4>New Expiration Date</h4>
            <input
              className="DateInput"
              type="date"
              value={inspection}
              onChange={(e) => setInspection(e.target.value)}
            />
            <h3 className={getDateClass(inspection)}>
              {" "}
              {new Date(inspection).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h3>
          </div>
        </div>
        <div className="SettingsBtns">
          <button onClick={() => setWindow(0)} className="SettingsBtn Cancel">
            Cancel
          </button>
          <button onClick={handleInspection} className="SettingsBtn">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
