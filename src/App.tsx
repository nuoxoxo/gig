import { useState } from 'react'
import Aoc2223 from "./includes/Aoc2223"
import Aoc2210 from "./includes/Aoc2210"
import Aoc1802 from "./includes/Aoc1802"
import Aoc1501 from "./includes/Aoc1501"
import Aoc1908 from "./includes/Aoc1908"
import DadJokes from "./includes/DadJokes"
import { GetRandomHexColorCode } from './helpers/Helpers'
import './styles/App.scss'

type TargetRoute = React.FC

const routes: { [key: string]: TargetRoute } = {
  '2223': Aoc2223,
  '2210': Aoc2210,
  '1802': Aoc1802,
  '1501': Aoc1501,
  '1908': Aoc1908,
  'DadJokes': DadJokes,
}

function App() {
  const [ route, setRoute ] = useState<string>( 
    // '2210'
    Object.keys(routes)[Math.floor(Math.random() * Object.keys(routes).length)] 
  )

  const handleSetRoute = (r: string) => {
    setRoute(r)
  }
  const TargetRoute: TargetRoute = routes[route]
  const ColorHeader: string = GetRandomHexColorCode()

  return (
    <>
      <h2 className='gig-header' style={{ color: ColorHeader }} >
        Hello World
      </h2>
      <div className='nav'>
        <button 
          className='btn' 
          onClick={()=>handleSetRoute('1501')} >
          15:01
        </button>
        {/* <button className='btn' onClick={()=>handleSetRoute('1502')} > 15:02</button> */}
        <button 
          className='btn' 
          onClick={()=>handleSetRoute('1802')} >
          18:02
        </button>
        <button 
          className='btn' 
          onClick={()=>handleSetRoute('1908')} >
          19:08
        </button>
        <button 
          className='btn' 
          onClick={()=>handleSetRoute('2210')} >
          22:10
        </button>
        <button 
          className='btn' 
          onClick={()=>handleSetRoute('2223')} >
          22:23
        </button>
        <button 
          className='btn' 
          onClick={()=>handleSetRoute('DadJokes')} >
          Jokes
        </button>
      </div>
      { routes.hasOwnProperty(route) ? <TargetRoute /> : null }
    </>
  )
}

export default App
