import { motion, AnimatePresence } from "motion/react";
import "./Version.css";

const releases = [
  {
    version: "1.5",
    date: "January 13, 2026",
    notes: [
      "Added the last time a vehicle was updated",
      "Added wrong password notification",
      "Fixed various CSS issues on a few different pages",
      "added sections for plate info and registration info",
      "fixed refresh issue on schedule tab",
      "moved vehicle status toggle and add note button",
    ],
  },
  {
    version: "1.41",
    date: "October 21, 2025",
    notes: [
      "removed redundant headers for edit windows",
      "fixed zooming behavior on mobile devices",
      "added ability to delete DAs from schedule",
    ],
  },
  {
    version: "1.4",
    date: "September 23, 2025",
    notes: [
      "added full VIN display for desktop",
      "edit VIN functionality",
      "updated display of vehicle list",
      "added sorter for Cargo Vans",
      "added hamburger menu for navigating pages",
      "added scrollbar to schedule overflow",
    ],
  },
  {
    version: "1.3",
    date: "September 18, 2025",
    notes: [
      "added schedule feature",
      "add, reseet status, change confirmation status of DAs",
    ],
  },
  {
    version: "1.2",
    date: "September 7, 2025",
    notes: [
      "condensed sorters/search into one",
      "added number of search results",
    ],
  },
  {
    version: "1.1",
    date: "September 2, 2025",
    notes: [
      "Added sorter for the vehicle list, places grounded vehicles at top of list",
      "Enabled editing of notes",
      "Introduced a new filter to view vehicles updated within the last 4 days",
      "Created a dedicated Resources page, still in progress",
      "Display note counts before expanding a vehicle’s details",
      "added footer and version history page",
    ],
  },
  {
    version: "1.0",
    date: "August 18, 2025",
    notes: [
      "Implemented account creation and sign-in functionality",
      "Added ability to create vehicles",
      "Introduced editing for inspections, tire pressure, fluids, and drive status",
      "Enabled adding and deleting notes",
      "Added vehicle metrics dashboard",
      "Introduced four different sorting options with filters that can stack",
      "Added search by name/vin",
    ],
  },
];

export default function Version() {
  return (
    <div className="Version">
      <motion.header
        className="V_Header"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      ></motion.header>

      <div className="V_List">
        <AnimatePresence initial={false}>
          {releases.map((r, i) => (
            <motion.article
              key={r.version}
              className="V_Card"
              layout
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.22, ease: "easeOut", delay: i * 0.03 }}
              whileHover={{ y: -2, scale: 1.01 }}
            >
              <div className="V_CardHead">
                <h2 className="V_Tag">v{r.version}</h2>
                <time className="V_Date">{r.date}</time>
              </div>
              <ul className="V_Notes">
                {r.notes.map((n, idx) => (
                  <li key={idx}>{n}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
