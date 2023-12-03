import { useState } from "react";
// import Aoc2223 from "./includes/Aoc2223";
import Aoc2222 from "./includes/Aoc2222";
import Aoc2212 from "./includes/Aoc2212";
// import Aoc2212Alt from "./includes/Aoc2212Alt";
import Aoc2210 from "./includes/Aoc2210";
// import Aoc2105 from "./includes/Aoc2105"; // dropped : not interesting 
import Aoc2003 from "./includes/Aoc2003";
import Aoc2011 from "./includes/Aoc2011"; // to solve *
import Aoc1908 from "./includes/Aoc1908";
import Aoc1818 from "./includes/Aoc1818";
import Aoc1813 from "./includes/Aoc1813";
import Aoc1810 from "./includes/Aoc1810";
import Aoc1803 from "./includes/Aoc1803"; // to solve *
import Aoc1802 from "./includes/Aoc1802";
import Aoc1608 from "./includes/Aoc1608";
// import Aoc1502 from "./includes/Aoc1502"; // dropped : not interesting 
import Aoc1501 from "./includes/Aoc1501";
import Aoc2301 from "./includes/Aoc2301";
import Aoc2302 from "./includes/Aoc2302";
import Aoc2303 from "./includes/Aoc2303";
import DadJokes from "./includes/DadJokes";
import "./styles/App.scss";

type TargetRoute = React.FC;

const routes: { [key: string]: TargetRoute } = {
  // Valid Identifiers (No quotes needed)
  2303: Aoc2303,
  2302: Aoc2302,
  2301: Aoc2301,
  // 2223: Aoc2223,
  2222: Aoc2222,
  2212: Aoc2212, 
  2210: Aoc2210,
  // 2105: Aoc2105, // dropped
  2003: Aoc2003,
  2011: Aoc2011, // to solve
  1908: Aoc1908,
  1818: Aoc1818,
  1813: Aoc1813,
  1810: Aoc1810,
  1803: Aoc1803, // to solve
  1802: Aoc1802,
  // 1502: Aoc1502,
  1501: Aoc1501,
  1608: Aoc1608,
  DadJokes: DadJokes,
};

function App() {

  const routeFromLocalStorage = localStorage.getItem("route");

  // fixed. previous code : take random route without `handleSetRoute`
  /*
  const [route, setRoute] = useState<string>(
    routeFromLocalStorage
      ? JSON.parse(routeFromLocalStorage) // save route to local storage
      : Object.keys(routes)[
          Math.floor(Math.random() * Object.keys(routes).length)
        ]
  )
  */

  const [route, setRoute] = useState<string>(() => {
    const len = Object.keys(routes).length
    const initialRoute = 
      routeFromLocalStorage 
      ? JSON.parse(routeFromLocalStorage)
      : Object.keys(routes)[
          Math.floor(Math.random() * len /*Object.keys(routes).length*/)
        ]
    // handleSetRoute(initialRoute) // hoisting seems wrong in strictMode
    localStorage.setItem("route", JSON.stringify(initialRoute));
    return initialRoute
  })

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
              // : key === '2212Alt' ? "22:12\'"
              : key.replace(/^(\d{2})(\d{1,2})$/, "$1:$2")}
          </button>
        ))}

        {/*
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            location.href = "http://nuoxoxo.github.io/jukebox";
          }}>
          Music 
        </button>
        */}

        {/*
        <button
          className="btn btn-dmd"
          onClick={(e) => {
            e.preventDefault();
            location.href = "http://nuoxoxo.github.io/dmd";
          }}>
          Dooms 
        </button>
        */}
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
