import "./Home.css";
import Cool from "../../assets/images/backgrounds/cool.jpg";

export default function Home() {
  return (
    <div className="Home">
      <h1>Welcome to Apollo Dispatch</h1>
      <div class="img-frame">
        <img src={Cool} alt="Logo" />
      </div>
    </div>
  );
}
