import Route2210 from "./Routes/Route2210"
// import Route2113 from "./Routes/Route2113"
import Route1802 from "./Routes/Route1802"
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom"

var App = () => {
  return (
    // <Router>
    <Router basename={import.meta.env.DEV ? "/" : "/gig/"}>
      <>
        <nav>
          <ul>
            <li>
              {/* <button onClick={() => window.location.href="/route2210"}>
              22:10</button> */}
              <Link to="/route2210"><button>22:10</button></Link>
            </li>
            <li>
              {/* <button onClick={() => window.location.href="/route1802"}>
              18:02</button> */}
              <Link to="/route1802"><button>18:02</button></Link>
            </li>
            {/* <li>
              <button onClick={() => window.location.href="/route2113"}>
              21:13</button>
            </li> */}
          </ul>
        </nav>

        {/* must define routes below nav */}
        <Routes>
          <Route path="/route1802" element={<Route1802 />} />
          <Route path="/route2210" element={<Route2210 />} />
          {/* <Route path="/route2113" element={<Route2113 />} /> */}
        </Routes>
      </>
    </Router>
  )
}

export default App
