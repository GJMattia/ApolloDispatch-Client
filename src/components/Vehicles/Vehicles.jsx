import "./Vehicles.css";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useMemo, useDeferredValue } from "react";
import { getVehicles } from "../../../utilities/vehicle-api";
import CreateVehicle from "../CreateVehicle/CreateVehicle.jsx";
import EditTires from "../EditTires/EditTires.jsx";
import EditFluid from "../EditFluid/EditFluid.jsx";
import EditStatus from "../EditStatus/EditStatus.jsx";
import EditRegistration from "../EditRegistration/EditRegistration.jsx";
import AddNote from "../AddNote/AddNote.jsx";
import { getDateClass } from "../../../utilities/helpful-functions.js";
import Sorter from "../Sorter/Sorter.jsx";
import Metrics from "../Metrics/Metrics.jsx";
import DeleteNote from "../DeleteNote/DeleteNote.jsx";

export default function Vehicles() {
  //Vehicle Data
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [openNotesId, setOpenNotesId] = useState(null);
  const [selectedNote, setSelectedNote] = useState("");

  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search); // smoother typing w/ animations

  //Edit Windows
  const [createWindow, setCreateWindow] = useState(false);
  const [tireWindow, setTireWindow] = useState(false);
  const [fluidWindow, setFluidWindow] = useState(false);
  const [statusWindow, setStatusWindow] = useState(false);
  const [registrationWindow, setRegistrationWindow] = useState(false);
  const [noteWindow, setNoteWindow] = useState(false);
  const [deleteNoteWindow, setDeleteNoteWindow] = useState(false);

  // NEW: simple tire filter toggle
  const [filters, setFilters] = useState({
    tire: false,
    fluid: false,
    grounded: false,
  });

  const visibleVehicles = useMemo(() => {
    return vehicles.filter(
      (v) =>
        (!filters?.tire || v.tire === false) &&
        (!filters?.fluid || v.fluid === false) &&
        (!filters?.grounded || v.status === 2) &&
        matchesSearch(v, deferredSearch)
    );
  }, [vehicles, filters, deferredSearch]);

  function matchesSearch(v, qRaw) {
    const q = qRaw.trim().toLowerCase();
    if (!q) return true;

    const name = (v.name || "").toLowerCase();

    // sanitize VIN, allow searching entire VIN too, but prefer last-4 when numeric
    const vin = String(v.vin || "")
      .replace(/[\s-]/g, "")
      .toLowerCase();
    const last4 = vin.slice(-4);

    // if user typed only digits (1–4), use last-4 match
    const isDigits = /^[0-9]{1,4}$/.test(q);

    return name.includes(q) || (isDigits ? last4.includes(q) : vin.includes(q));
  }

  useEffect(function () {
    async function handleGetVehicles() {
      try {
        const response = await getVehicles();
        setVehicles(response);
      } catch (error) {
        console.error("Error getting posts", error);
      }
    }
    handleGetVehicles();
  }, []);

  function handleVehicleClick(vehicle) {
    setSelectedVehicle(vehicle);
  }

  function handleDeleteNote(vehicleId, vehicleName, noteContent, noteIndex) {
    setSelectedNote({
      vehicleId,
      vehicleName,
      noteContent,
      noteIndex,
    });
    setDeleteNoteWindow(true);
  }

  return (
    <div className="Vehicles">
      {/* Quick filter button */}

      {createWindow && (
        <CreateVehicle
          setCreateWindow={setCreateWindow}
          setVehicles={setVehicles}
        />
      )}

      {tireWindow && (
        <EditTires
          setTireWindow={setTireWindow}
          selectedVehicle={selectedVehicle}
          setVehicles={setVehicles}
        />
      )}

      {fluidWindow && (
        <EditFluid
          setFluidWindow={setFluidWindow}
          selectedVehicle={selectedVehicle}
          setVehicles={setVehicles}
        />
      )}

      {statusWindow && (
        <EditStatus
          setStatusWindow={setStatusWindow}
          selectedVehicle={selectedVehicle}
          setVehicles={setVehicles}
        />
      )}
      {registrationWindow && (
        <EditRegistration
          setRegistrationWindow={setRegistrationWindow}
          selectedVehicle={selectedVehicle}
          setVehicles={setVehicles}
        />
      )}

      {noteWindow && (
        <AddNote
          setNoteWindow={setNoteWindow}
          selectedVehicle={selectedVehicle}
          setVehicles={setVehicles}
        />
      )}

      {deleteNoteWindow && (
        <DeleteNote
          selectedNote={selectedNote}
          setDeleteNoteWindow={setDeleteNoteWindow}
          setVehicles={setVehicles}
        />
      )}

      {vehicles && <Metrics vehicles={vehicles} />}
      <Sorter filters={filters} onChange={setFilters} />

      <input
        className="VehicleSearch"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or last 4 of VIN..."
        aria-label="Search vehicles"
      />
      {/* <button className="CreateBtn" onClick={() => setCreateWindow(true)}>
        Create Vehicle
      </button> */}
      {visibleVehicles && visibleVehicles.length > 0 ? (
        <ul className="VehicleList">
          <AnimatePresence initial={false}>
            {visibleVehicles.map((vehicle) => (
              <motion.li
                key={vehicle._id} // stable key = smoother exits
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className={`Vehicle ${vehicle.className || ""}`}
                onClick={() => handleVehicleClick(vehicle)}
              >
                <table className="VehicleTable">
                  <thead>
                    <tr>
                      <th className="VehicleName">{vehicle.name}</th>
                      <th>VIN</th>
                      <th>Registration</th>
                      <th>Tire Pressure</th>
                      <th>Wiper Fluid</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{vehicle.type}</td>
                      <td>{vehicle.vin}</td>
                      <td
                        onClick={() => setRegistrationWindow(true)}
                        className={getDateClass(vehicle.registration)}
                      >
                        {new Date(vehicle.registration).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td onClick={() => setTireWindow(true)}>
                        {vehicle.tire ? "✅" : "❌"}
                      </td>
                      <td onClick={() => setFluidWindow(true)}>
                        {vehicle.fluid ? "✅" : "❌"}
                      </td>
                      <td onClick={() => setStatusWindow(true)}>
                        {vehicle.status === 0
                          ? "✅"
                          : vehicle.status === 1
                          ? "⚠️"
                          : "❌"}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <AnimatePresence initial={false}>
                  {openNotesId === vehicle._id && (
                    <motion.div
                      key="notes"
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ overflow: "hidden", width: "90%" }}
                    >
                      {!vehicle.notes || vehicle.notes.length === 0 ? (
                        <h4 className="NoNotes">This vehicle has no notes</h4>
                      ) : (
                        <ul className="NoteList">
                          <AnimatePresence initial={false}>
                            {vehicle.notes.map((note, i) => {
                              const date =
                                note.createdAt &&
                                new Date(note.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                  }
                                );

                              const noteText =
                                typeof note === "string" ? note : note.text;

                              return (
                                <motion.li
                                  className="Note"
                                  key={`${vehicle._id}-${i}-${noteText}`}
                                  layout
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -6 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <button
                                    onClick={() =>
                                      handleDeleteNote(
                                        vehicle._id,
                                        vehicle.name,
                                        noteText,
                                        i
                                      )
                                    }
                                    className="DeleteNoteBtn"
                                  >
                                    delete
                                  </button>
                                  {date && (
                                    <strong style={{ color: "gray" }}>
                                      {date}:
                                    </strong>
                                  )}{" "}
                                  {noteText}
                                </motion.li>
                              );
                            })}
                          </AnimatePresence>
                        </ul>
                      )}

                      <button
                        onClick={() => setNoteWindow(true)}
                        className="Add"
                      >
                        add note
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  className="NotesBtn"
                  aria-expanded={openNotesId === vehicle._id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenNotesId((prev) =>
                      prev === vehicle._id ? null : vehicle._id
                    );
                  }}
                >
                  {openNotesId === vehicle._id
                    ? "Hide Vehicle Notes"
                    : "View Vehicle Notes"}
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <h3 className="Red">No Vehicles Found</h3>
      )}
    </div>
  );
}
