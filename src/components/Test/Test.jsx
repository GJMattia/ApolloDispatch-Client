import "./Test.css";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Test() {
  const [items, setItems] = useState([
    { id: 1, text: "Apollo" },
    { id: 2, text: "Zeus" },
    { id: 3, text: "Hermes" },
  ]);
  const [nextId, setNextId] = useState(4);

  function addItem() {
    setItems((prev) => [{ id: nextId, text: `Item ${nextId}` }, ...prev]);
    setNextId((n) => n + 1);
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="Test">
      <div className="controls">
        <button onClick={addItem}>Add item</button>
        <button onClick={() => setItems([])} disabled={!items.length}>
          Clear
        </button>
      </div>

      <motion.ul layout className="list">
        <AnimatePresence>
          {items.map((item) => (
            <motion.li
              layout
              key={item.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {item.text}
              <button
                className="remove"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.text}`}
              >
                ×
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <p className="hint">Tip: Removing triggers the exit animation. 🤙</p>
    </div>
  );
}
