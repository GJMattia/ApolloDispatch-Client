import "./AddNote.css";
import { useState } from "react";
import { addNote } from "../../../utilities/vehicle-api";

export default function AddNote({
  selectedVehicle,
  setNoteWindow,
  setVehicles,
}) {
  const [note, setNote] = useState("");

  async function handleNote() {
    try {
      let response = await addNote({
        vehicleID: selectedVehicle._id,
        note: note,
      });

      setVehicles((prev) =>
        prev.map((v) =>
          v._id === response.id || v.id === response.id
            ? { ...v, notes: response.notes }
            : v
        )
      );

      setNoteWindow(false);
    } catch (error) {
      console.error("error adding note", error);
    }
  }

  {
    return (
      <div className="EditWindowOverlay">
        <div className="EditWindow">
          <h1>Add Note to {selectedVehicle.name}</h1>
          <h3>Write your note for {selectedVehicle.name}</h3>
          <textarea
            className="NoteInput"
            type="text"
            placeholder="Write your note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={150}
          />
          <div className="SettingsBtns">
            <button
              onClick={() => setNoteWindow((prev) => !prev)}
              className="SettingsBtn Cancel"
            >
              Cancel
            </button>
            <button onClick={handleNote} className="SettingsBtn Update">
              Add Note
            </button>
          </div>
        </div>
      </div>
    );
  }
}
