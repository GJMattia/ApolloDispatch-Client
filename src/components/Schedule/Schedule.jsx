import "./Schedule.css";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import CreateDA from "../CreateDA/CreateDA";
import { getDAs, flipStatus, resetAllStatus } from "../../../utilities/da-api";

export default function Schedule() {
  const [addWindow, setAddWindow] = useState(false);
  const [DAs, setDAs] = useState([]);

  const confirmedCount = DAs.filter((d) => d.confirmed).length;
  const unconfirmedCount = DAs.length - confirmedCount;

  function sortDAs(list) {
    return [...list].sort((a, b) => {
      if (a.confirmed === b.confirmed) return a.name.localeCompare(b.name);
      return a.confirmed ? 1 : -1;
    });
  }

  useEffect(function () {
    async function handleGetDAs() {
      try {
        const response = await getDAs();
        setDAs(sortDAs(response));
      } catch (error) {
        console.error("Error getting DAs", error);
      }
    }
    handleGetDAs();
  }, []);

  async function handleFlip(DAID) {
    try {
      let response = await flipStatus({ DAID });
      const { _id, confirmed } = response;

      setDAs((prev) =>
        sortDAs(prev.map((da) => (da._id === _id ? { ...da, confirmed } : da)))
      );
    } catch (error) {
      console.error("error flipping DA Status", error);
    }
  }

  async function handleReset() {
    try {
      const response = await resetAllStatus();
      setDAs(sortDAs(response));
    } catch (error) {
      console.error("error resetting all da status", error);
    }
  }

  return (
    <div className="Schedule">
      {addWindow && <CreateDA setAddWindow={setAddWindow} setDAs={setDAs} />}

      <div className="ScheduleUI">
        {/* <button>Sort</button> */}
        <button className="ScheduleBtn" onClick={() => setAddWindow(true)}>
          Add DA
        </button>
        <button className="ScheduleBtn" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="ScheduleScroll">
        <table className="ScheduleTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Confirm Status</th>
            </tr>
          </thead>

          <motion.tbody layout>
            {DAs.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", color: "gray" }}>
                  No associates yet
                </td>
              </tr>
            ) : (
              <AnimatePresence initial={false}>
                {DAs.map((da) => (
                  <motion.tr
                    key={da._id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <td>{da.name}</td>
                    <td>{da.title}</td>
                    <td
                      onClick={() => handleFlip(da._id)}
                      className={`ScheduleStatus ${
                        da.confirmed ? "Green" : "Red"
                      }`}
                    >
                      {da.confirmed ? "Confirmed" : "Not Confirmed"}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </motion.tbody>
        </table>
      </div>
      <div className="ScheduleUI2">
        <p className="Green">Confirmed: {confirmedCount}</p>
        <p className="Red">Not Confirmed: {unconfirmedCount}</p>
      </div>
    </div>
  );
}
