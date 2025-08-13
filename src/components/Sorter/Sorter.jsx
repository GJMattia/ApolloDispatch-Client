import "./Sorter.css";

export default function Sorter({ filters, onChange }) {
  const { tire, fluid, grounded } = filters;

  return (
    <ul className="Sorter">
      <li
        type="button"
        className={`FilterButton ${tire ? "active" : ""}`}
        onClick={() => onChange({ ...filters, tire: !tire })}
      >
        Filter by low tire pressure
      </li>

      <li
        type="button"
        className={`FilterButton ${fluid ? "active" : ""}`}
        onClick={() => onChange({ ...filters, fluid: !fluid })}
      >
        Filter by low wiper fluid
      </li>

      <li
        type="button"
        className={`FilterButton ${grounded ? "active" : ""}`}
        onClick={() => onChange({ ...filters, grounded: !grounded })}
      >
        Filter by grounded vehicles
      </li>
    </ul>
  );
}
