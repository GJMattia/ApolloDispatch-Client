import "./DeleteNote.css";
import { deleteNote } from "../../../utilities/vehicle-api";

export default function DeleteNote({
  setVehicles,
  selectedNote,
  setDeleteNoteWindow,
}) {
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
            notes: v.notes.filter((_, i) => i !== response.noteIndex),
          };
        })
      );

      setDeleteNoteWindow(false);
    } catch (error) {
      console.error("error deleting note".error);
    }
  }

  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>Delete a note for {selectedNote.vehicleName}</h1>
        <h3>Are you sure you want to delete the following note?</h3>

        <h4>{selectedNote.noteContent}</h4>

        <div className="SettingsBtns">
          <button
            onClick={() => setDeleteNoteWindow((prev) => !prev)}
            className="SettingsBtn Cancel"
          >
            Cancel
          </button>
          <button onClick={handleDeleteNote} className="SettingsBtn Update">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
