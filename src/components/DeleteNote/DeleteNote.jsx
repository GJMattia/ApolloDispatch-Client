import "./DeleteNote.css";
import { deleteNote } from "../../../utilities/vehicle-api";

export default function DeleteNote({ setVehicles, selectedNote, setWindow }) {
  async function handleDeleteNote() {
    try {
      const response = await deleteNote({
        vehicleId: selectedNote.vehicleId,
        noteIndex: selectedNote.noteIndex,
      });

      setVehicles((prev) =>
        prev.map((v) => {
          if (v._id !== response.vehicleId) return v;

          return {
            ...v,

            updatedAt: response.updatedAt,

            notes: v.notes.filter((_, i) => i !== response.noteIndex),
          };
        }),
      );

      setWindow(0);
    } catch (error) {
      console.error("error deleting note".error);
    }
  }

  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>Delete note for {selectedNote.vehicleName}</h1>

        <h4 className="DeleteNoteInfo">{selectedNote.noteContent}</h4>

        <div className="SettingsBtns">
          <button onClick={() => setWindow(0)} className="SettingsBtn Cancel">
            Cancel
          </button>
          <button onClick={handleDeleteNote} className="SettingsBtn">
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
}
