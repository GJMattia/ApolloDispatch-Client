import "./Test.css";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Test() {
  return (
    <div className="Test">
      <ul className="VehicleList2">
        <li className="Vehicle2">
          <div className="VehicleInfo">
            <h1>EV01</h1>
            <h1>EV</h1>
            <h5>VIN: 23432342423424</h5>
            <h5>Inspection: 10-10-2020</h5>
          </div>
        </li>
        <li className="Vehicle">Two</li>
        <li className="Vehicle">Three</li>
      </ul>
    </div>
  );
}
