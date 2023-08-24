import { useState } from "react"
import Aoc2223 from "./includes/Aoc2223"
import Aoc2210 from "./includes/Aoc2210"
import Aoc1802 from "./includes/Aoc1802"
import Aoc1501 from "./includes/Aoc1501"
import Aoc1608 from "./includes/Aoc1608"
import Aoc1908 from "./includes/Aoc1908"
import Aoc2212 from "./includes/Aoc2212" // New
import DadJokes from "./includes/DadJokes"
import "./styles/App.scss"

type TargetRoute = React.FC

const routes: { [key: string]: TargetRoute } = {
  "2223": Aoc2223,
  "2212": Aoc2212, // New
  "2210": Aoc2210,
  "1802": Aoc1802,
  "1501": Aoc1501,
  "1608": Aoc1608,
  "1908": Aoc1908,
  DadJokes: DadJokes,
}

function App() {
  const oldRoute = localStorage.getItem("route")

  const [route, setRoute] = useState<string>(
    oldRoute
      ? JSON.parse(oldRoute) // save route to local storage
      : Object.keys(routes)[
          Math.floor(Math.random() * Object.keys(routes).length)
        ]
  )

  const handleSetRoute = (r: string) => {
    localStorage.setItem("route", JSON.stringify(r)) // save route to local storage
    setRoute(r)
  }
  const TargetRoute: TargetRoute = routes[route]

  return (
    <>
      <h2 className="gig-header">Hello World</h2>
      <div className="nav">

        {/* New code */}

        {Object.keys(routes).map((key) => (
          <button
            key={key}
            onClick={() => handleSetRoute(key)}
            className={`btn ${oldRoute === key || route === key ? 'btn-current-route' : ''}`}
          >
            {key === 'DadJokes' ? 'Jokes' : key.replace(
              /^(\d{2})(\d{2})$/, 
              '$1:$2'
            )}
          </button>
        ))}

        {/* O.d code */}

        {/*
        <button
          className={`btn ${ oldRoute === '1501' || route === '1501' ? 'btn-current-route' : ''}`}
          onClick={()=>handleSetRoute('1501')} >
          15:01
        </button>

        <button 
          className={
            `btn ${ oldRoute === '1608' || route === '1608' ? 'btn-current-route' : ''}`
          }
          onClick={()=>handleSetRoute('1608')} >
          16:08
        </button>

        <button
          className={
            `btn ${ oldRoute === '1802' || route === '1802' ? 'btn-current-route' : ''}`
          }
          onClick={()=>handleSetRoute('1802')} >
          18:02
        </button>

        <button 
          className={
            `btn ${ oldRoute === '1908' || route === '1908' ? 'btn-current-route' : ''}`
          }
          onClick={()=>handleSetRoute('1908')} >
          19:08
        </button>

        <button 
          className={
            `btn ${ oldRoute === '2210' || route === '2210' ? 'btn-current-route' : ''}`
          }
          onClick={()=>handleSetRoute('2210')} >
          22:10
        </button>

        <button 
          className={
            `btn ${ oldRoute === '2212' || route === '2212' ? 'btn-current-route' : ''}`
          }
          onClick={()=>handleSetRoute('2212')} >
          22:12
        </button>

        <button 
          className={
            `btn ${ oldRoute === '2223' || route === '2223' ? 'btn-current-route' : ''}`
          }
          onClick={()=>handleSetRoute('2223')} >
          22:23
        </button>

        <button 
          className={
            `btn ${ oldRoute === 'DadJokes' || route === 'DadJokes'  ? 'btn-current-route' : ''}`
          }
          onClick={()=>handleSetRoute('DadJokes')} >
          Jokes
        </button>

        */}

        <button
          className="btn btn-io"
          onClick={(e) => {
            e.preventDefault()
            location.href = "http://nuoxoxo.github.io"
          }}
        >
          &#8203;
          {/* &nbspio&nbsp */}
        </button>

      </div>
      {routes.hasOwnProperty(route) ? <TargetRoute /> : null}
    </>
  )
}

export default App
