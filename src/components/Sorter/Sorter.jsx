import "./Sorter.css";

export default function Sorter({ filters, onChange }) {
  return (
    <ul className="Sorter">
      {/* Vehicle Type */}
      <li>
        <select
          className="FilterSelect"
          value={filters.type}
          onChange={(e) => onChange((f) => ({ ...f, type: e.target.value }))}
        >
          <option value="">All Vehicle Types</option>
          <option value="Electric Van">Electric Van</option>
          <option value="Step Van">Step Van</option>
        </select>
      </li>
      {/* Tire Filter */}
      <li>
        <select
          className="FilterSelect"
          value={filters.tire}
          onChange={(e) =>
            onChange((f) => ({
              ...f,
              tire: e.target.value === "" ? "" : e.target.value === "true",
            }))
          }
        >
          <option value="">All Pressure</option>
          <option value="true">Adequate Pressure</option>
          <option value="false">Needs Pressure</option>
        </select>
      </li>

      {/* Fluid Filter */}
      <li>
        <select
          className="FilterSelect"
          value={filters.fluid}
          onChange={(e) =>
            onChange((f) => ({
              ...f,
              fluid: e.target.value === "" ? "" : e.target.value === "true",
            }))
          }
        >
          <option value="">All Fluid</option>
          <option value="true">Adequate Fluid</option>
          <option value="false">Needs Fluid</option>
        </select>
      </li>

      {/* Status Filter */}
      <li>
        <select
          className="FilterSelect"
          value={filters.status}
          onChange={(e) =>
            onChange((f) => ({
              ...f,
              status: e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
        >
          <option value="">All Vehicle Status</option>
          <option value={0}>Adequate</option>
          <option value={1}>Caution</option>
          <option value={2}>Grounded</option>
        </select>
      </li>
    </ul>
  );
}
