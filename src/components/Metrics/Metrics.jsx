import "./Metrics.css";
import PieChart from "../PieChart/PieChart.jsx";
import PieChart2 from "../PieChart2/PieChart2.jsx";
import {
  getPieChartData,
  getBooleanFieldData,
} from "../../../utilities/helpful-functions.js";

export default function Metrics({ vehicles }) {
  return (
    <div className="Metrics">
      <h2>Fleet Overview</h2>
      <div className="Charts">
        <PieChart
          data={getBooleanFieldData(vehicles, "tire", "Tire Pressure")}
        />
        <PieChart
          data={getBooleanFieldData(vehicles, "fluid", "Wiper Fluid")}
        />
        <PieChart2 data={getPieChartData(vehicles, "status", "Drive Status")} />
      </div>
    </div>
  );
}
