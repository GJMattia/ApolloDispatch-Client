import "./CreateDA.css";
import { useState } from "react";
import { createDA } from "../../../utilities/da-api";
export default function CreateDA({ setAddWindow, setDAs }) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleCreateDA() {
    try {
      let response = await createDA({ formData });
      setDAs((prev) => [...prev, response]);
      setAddWindow(false);
    } catch (error) {
      console.error("error creating vehicle", error);
    }
  }

  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>Add DA</h1>

        <input
          className="CreateInput"
          placeholder="DA Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength={20}
        />

        <select
          className="CreateInput"
          name="title"
          value={formData.title}
          onChange={handleChange}
        >
          <option value="">Select DA Title</option>
          <option value="Driver">Driver</option>
          <option value="Helper">Helper</option>
        </select>

        <div className="SettingsBtns">
          <button
            onClick={() => setAddWindow(false)}
            className="SettingsBtn Cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateDA}
            className={`SettingsBtn ${
              !formData.name || !formData.title ? "NotYet" : ""
            }`}
          >
            Add DA
          </button>
        </div>
      </div>
    </div>
  );
}
