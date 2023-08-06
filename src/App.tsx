import { useState } from "react"
import Route1802 from "./Routes/Route1802"
import Route2210 from "./Routes/Route2210"
import RouteCats from "./Routes/RouteCats"
import RouteJoke from "./Routes/RouteJoke"

//  make `Route` the new typedef
type TargetRoute = React.FC

//  set routes of type <Route>
const routes: { [key: string]: TargetRoute } = {
  '2210': Route2210,
  '1802': Route1802,
  'cats': RouteCats,
  'dadj': RouteJoke,
}

//  default route onload
const defaultRoute: string = 'dadj'

var App = () => {

  const [ route, setRoute ] = useState<string>( defaultRoute )
  const handleSetRoute = (s: string) => {
    setRoute(s)
  }

  const TargetRoute = routes[route]
  return (
    <>
      <nav>
        <ul>
          <li><button onClick={()=>handleSetRoute('2210')}>22:10</button></li>
          <li><button onClick={()=>handleSetRoute('1802')}>18:02</button></li>
          <li><button onClick={()=>handleSetRoute('cats')}>Chats</button></li>
          <li><button onClick={()=>handleSetRoute('dadj')}>Jokes</button></li>
        </ul>
      </nav>
      { routes.hasOwnProperty(route) ? <TargetRoute /> : null }
    </>
  )
}

export default App
