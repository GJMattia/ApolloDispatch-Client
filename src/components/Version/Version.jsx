import { motion, AnimatePresence } from "motion/react";
import "./Version.css";

const releases = [
  {
    version: "0.55",
    date: "January 19, 2026",
    notes: [
      "Changed version format",
      "Added delete vehicle functionality",
      "Increased allowed characters for usernames and passwords in input fields",
      "Fixed CSS issues on numerous pages",
      "Reworked front-end code to eliminate 12 usestates, better optimizing switching windows",
      "Added reset password feature",
      "added footer to homepage and login page",
    ],
  },
  {
    version: "0.50",
    date: "January 13, 2026",
    notes: [
      "Added notification for wrong password",
      "Fixed CSS on various pages",
      "Added an updated at feature on each vehicle object",
      "Added the ability to add plate info, registration information to vehicle",
      "Reworked how to update the status of a vehicle",
    ],
  },
  {
    version: "0.45",
    date: "October 21, 2025",
    notes: [
      "Removed redundant headers for edit windows",
      "Fixed zooming behavior on mobile devices",
      "Added ability to delete DAs from schedule",
    ],
  },
  {
    version: "0.40",
    date: "September 23, 2025",
    notes: [
      "Added full VIN display for desktop",
      "Edit VIN functionality",
      "Updated display of vehicle list",
      "Added sorter for Cargo Vans",
      "Added hamburger menu for navigating pages",
      "Added scrollbar to schedule overflow",
    ],
  },
  {
    version: "0.30",
    date: "September 18, 2025",
    notes: [
      "Added schedule feature",
      "Added create, reset status, change confirmation status of DAs",
    ],
  },
  {
    version: "0.25",
    date: "September 7, 2025",
    notes: [
      "Condensed sorters/search into one",
      "Added number of search results",
    ],
  },
  {
    version: "0.20",
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
    version: "0.10",
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
