import "./EditNote.css";
import { useState } from "react";
import { editNote } from "../../../utilities/vehicle-api";

export default function EditNote({
  setVehicles,
  selectedNote,
  setEditNoteWindow,
}) {
  const [note, setNote] = useState(selectedNote.noteContent);

  async function handleEditNote() {
    try {
      const response = await editNote({
        vehicleId: selectedNote.vehicleId,
        noteIndex: selectedNote.noteIndex,
        editedNote: note,
      });

      console.log(response);

      setVehicles((prev) =>
        prev.map((v) => {
          if (v._id !== response.vehicleId) return v;

          return {
            ...v,
            updatedAt: response.updatedAt,
            notes: v.notes.map((n, i) =>
              i === response.noteIndex
                ? {
                    ...(typeof n === "object" && n !== null ? n : { text: n }),
                    text: response.editedNote,
                    updatedAt: response.updatedAt,
                  }
                : n
            ),
          };
        })
      );

      setEditNoteWindow(false);
    } catch (error) {
      console.error("error editing note".error);
    }
  }

  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>Edit note for {selectedNote.vehicleName}</h1>

        <textarea
          className="NoteInput"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={150}
        />

        <div className="SettingsBtns">
          <button
            onClick={() => setEditNoteWindow((prev) => !prev)}
            className="SettingsBtn Cancel"
          >
            Cancel
          </button>
          <button onClick={handleEditNote} className="SettingsBtn">
            Edit Note
          </button>
        </div>
      </div>
    </div>
  );
}
