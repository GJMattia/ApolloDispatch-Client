import "./DeleteDA.css";

import { deleteDA } from "../../../utilities/da-api";

export default function DeleteDA({
  setDeleteWindow,
  selectedDA,
  setSelectedDA,
  setDAs,
}) {
  async function handleDeleteDA() {
    try {
      const response = await deleteDA({ daID: selectedDA._id });
      const deletedID = response.deletedID;
      setDAs((prevDAs) => prevDAs.filter((da) => da._id !== deletedID));
      setDeleteWindow(false);
      setSelectedDA("");
    } catch (error) {
      console.error("Error deleting DA:", error);
    }
  }

  return (
    <div className="EditWindowOverlay">
      <div className="EditWindow">
        <h1>Delete DA from Schedule</h1>

        <h2 className="DeleteDAInfo">
          {" "}
          {selectedDA.name}: {selectedDA.title}
        </h2>

        <div className="SettingsBtns">
          <button
            onClick={() => setDeleteWindow(false)}
            className="SettingsBtn Cancel"
          >
            Cancel
          </button>
          <button onClick={handleDeleteDA} className="SettingsBtn">
            Delete DA
          </button>
        </div>
      </div>
    </div>
  );
}
