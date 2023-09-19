import { useState } from "react";
// import Aoc2223 from "./includes/Aoc2223";
import Aoc2222 from "./includes/Aoc2222";
import Aoc2212 from "./includes/Aoc2212"; // New New
import Aoc2210 from "./includes/Aoc2210";
import Aoc2105 from "./includes/Aoc2105"; // New
import Aoc2003 from "./includes/Aoc2003"; // New New
// import Aoc2011 from "./includes/Aoc2011"; // New New New
import Aoc1908 from "./includes/Aoc1908";
import Aoc1810 from "./includes/Aoc1810";
// import Aoc1803 from "./includes/Aoc1803"; // New New
import Aoc1802 from "./includes/Aoc1802";
import Aoc1608 from "./includes/Aoc1608";
import Aoc1502 from "./includes/Aoc1502";
import Aoc1501 from "./includes/Aoc1501";
import DadJokes from "./includes/DadJokes";
import "./styles/App.scss";
// import Label from "./includes/Label/Label.tsx"
// import "./includes/Label/Label.scss"


type TargetRoute = React.FC;

const routes: { [key: string]: TargetRoute } = {
  // Valid Identifiers (No quotes needed)
  // 2223: Aoc2223,
  2222: Aoc2222,
  2212: Aoc2212, // New
  2210: Aoc2210,
  2105: Aoc2105,
  2003: Aoc2003,
  // 2011: Aoc2011,
  1908: Aoc1908,
  1810: Aoc1810,
  // 1803: Aoc1803,
  1802: Aoc1802,
  1502: Aoc1502,
  1501: Aoc1501,
  1608: Aoc1608,
  // Label: Label,
  DadJokes: DadJokes,
};

function App() {
  const routeFromLocalStorage = localStorage.getItem("route");

  const [route, setRoute] = useState<string>(
    routeFromLocalStorage
      ? JSON.parse(routeFromLocalStorage) // save route to local storage
      : Object.keys(routes)[
          Math.floor(Math.random() * Object.keys(routes).length)
        ]
  );

  const handleSetRoute = (r: string) => {
    localStorage.setItem("route", JSON.stringify(r)); // save route to local storage
    setRoute(r);
  };
  const TargetRoute: TargetRoute = routes[route];

  return (
    <>
      <h2 className="gig-header">Hello World</h2>
      <div className="nav">
        {/* New code */}

        {Object.keys(routes).map((key) => (
          <button
            key={key}
            onClick={() => handleSetRoute(key)}
            className={`btn ${
              routeFromLocalStorage === key || route === key
                ? "btn-current-route"
                : ""
            }`}
          >
            { key === "DadJokes" ? "Jokes"
              : key === "Nut" ? "Nut"
              : key.replace(/^(\d{2})(\d{2})$/, "$1:$2")}
          </button>
        ))}

        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            location.href = "http://nuoxoxo.github.io/jukebox";
          }}>
          Music
          {/* &nbspio&nbsp */}
        </button>
        <button
          className="btn btn-dmd"
          onClick={(e) => {
            e.preventDefault();
            location.href = "http://nuoxoxo.github.io/dmd";
          }}>
          Dooms
          {/* &nbspio&nbsp */}
        </button>
        <button
          className="btn btn-io"
          onClick={(e) => {
            e.preventDefault();
            location.href = "http://nuoxoxo.github.io";
          }}>
          &#8203;
          {/* &nbspio&nbsp */}
        </button>

      </div>
      {routes.hasOwnProperty(route) ? <TargetRoute /> : null}
    </>
  );
}

export default App;
