import { useState } from "react"
import Route1802 from "./Routes/Route1802"
import Route2210 from "./Routes/Route2210"

var App = () => {
  const [ route, setRoute ] = useState<number>( 0 )
  const handleSetRoute = (n: number) => {
    setRoute(n)
  }
  return (
    <>
      <nav>
        <ul>
          <li>
            <button onClick={ () => handleSetRoute(2210) }>22:10</button>
          </li>
          <li>
            <button onClick={ () => handleSetRoute(1802) }>18:02</button>
          </li>
        </ul>
      </nav>
      { route === 2210 ? <Route2210 /> : null }
      { route === 1802 ? <Route1802 /> : null }
    </>
  )
}

export default App
