import "./CreateVehicle.css";
import { useState } from "react";
import { createVehicle } from "../../../utilities/vehicle-api";

export default function CreateVehicle({ setCreateWindow, setVehicles }) {
  const [formData, setFormData] = useState({
    name: "",
    vin: "",
    inspection: null,
    type: "",
  });

  async function handleCreateVehicle() {
    try {
      let response = await createVehicle({ formData });
      setVehicles((prevVehicles) => [...prevVehicles, response]);
      setCreateWindow(false);
    } catch (error) {
      console.error("error creating vehicle", error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>Create Vehicle</h1>

        <input
          className="CreateInput"
          placeholder="Vehicle Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength={15}
        />

        <input
          className="CreateInput"
          placeholder="Last 4 of VIN"
          name="vin"
          value={formData.vin}
          onChange={handleChange}
          maxLength={4}
        />

        <input
          type="date"
          className="CreateInput"
          placeholder="Inspection Expiration"
          name="inspection"
          value={formData.inspection}
          onChange={handleChange}
        />

        <select
          className="CreateInput"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">Select Vehicle Type</option>
          <option value="Electric Van">Electric Van</option>
          <option value="Step Van">Step Van</option>
          <option value="Cargo Van">Cargo Van</option>
          <option value="Rental Van">Rental Van</option>
        </select>

        <div className="SettingsBtns">
          <button
            onClick={() => setCreateWindow(false)}
            className="SettingsBtn Cancel"
          >
            Cancel
          </button>
          <button onClick={handleCreateVehicle} className="SettingsBtn Update">
            Create Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}
