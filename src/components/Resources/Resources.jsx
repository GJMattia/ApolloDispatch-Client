import { motion } from "motion/react";
import "./Resources.css";
import Footer from "../Footer/Footer";

export default function Resources() {
  return (
    <div className="Resources">
      <div className="ResourceList">
        <motion.article
          className="Resource"
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          whileHover={{ y: -2, scale: 1.01 }}
        >
          <h2>Rivian</h2>
          <h3>Roadside Assistance: 1-800-433-7195</h3>
          <h3>Service Info: FleetSupport@rivian.com — 855-748-2225</h3>
        </motion.article>

        <motion.article
          className="Resource"
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut", delay: 0.05 }}
          whileHover={{ y: -2, scale: 1.01 }}
        >
          <h2>Driver Assistance</h2>
          <h3>LMET: 800-942-3300</h3>
          <h3>Driver Support: 877-252-4823</h3>
          <h3>DOT Tow: 1-800-323-1125</h3>
        </motion.article>

        <motion.article
          className="Resource"
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut", delay: 0.1 }}
          whileHover={{ y: -2, scale: 1.01 }}
        >
          <h2>Tire Sizes</h2>
          <h3>All Steps: 245/70 R19.5</h3>
          <h3>Rivian EV: 245/70 R17</h3>
          <h3>Cargo Ford: 235/65 R16</h3>
          <h3>Cargo RAM: 225/75 R16</h3>
        </motion.article>

        <motion.article
          className="Resource"
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut", delay: 0.1 }}
          whileHover={{ y: -2, scale: 1.01 }}
        >
          <h2>Dealer Phone Numbers</h2>
          <h3>Otis Ford: 631-653-4000</h3>
          <h3>Freightliner: 631-563-1300</h3>
        </motion.article>
      </div>
      <p className="rock">
        there is not much on this page right now. i am aware
      </p>
      {/* <Footer /> */}
    </div>
  );
}
