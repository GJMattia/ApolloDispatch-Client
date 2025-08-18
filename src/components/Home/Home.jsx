import "./Home.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Computer from "../../assets/images/home/computer.png";
import Truck from "../../assets/images/home/truck.png";
import Cash from "../../assets/images/home/cash.png";

export default function Home() {
  const [show, setShow] = useState(true);

  // Optional: replay the entrance animation when navigating back
  useEffect(() => {
    setShow(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.1, when: "beforeChildren", staggerChildren: 0.12 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="Home">
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            className="HomeInner"
            variants={container}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.h1 className="HomeTitle" variants={fadeUp}>
              Welcome to Apollo Dispatch
            </motion.h1>

            <motion.p className="HomeSubtitle" variants={fadeUp}>
              The best vehicle organizer on planet earth
            </motion.p>

            <motion.div className="HomeDiv" variants={fadeUp}>
              {/* Left card */}
              <motion.div
                className="HomeBox"
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              >
                <motion.img
                  src={Computer}
                  alt="Organize on computer"
                  className="HeroImg"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
                <h2>Organize</h2>
                <p>Centralize vehicles, notes, and maintenance in one place.</p>
              </motion.div>

              {/* Right card */}
              <motion.div
                className="HomeBox"
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              >
                <motion.img
                  src={Truck}
                  alt="Delivery truck"
                  className="HeroImg"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
                <h2>Deliver</h2>
                <p>Keep routes flowing with simple checks.</p>
              </motion.div>
              <motion.div
                className="HomeBox"
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              >
                <motion.img
                  src={Cash}
                  alt="Profit"
                  className="HeroImg"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
                <h2>Profit</h2>
                <p>Am i right?</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
