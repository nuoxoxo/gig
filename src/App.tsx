import { useState } from 'react'
import Aoc2210 from "./includesAoc/Aoc2210"
import Aoc1802 from "./includesAoc/Aoc1802"
import Aoc1502 from "./includesAoc/Aoc1502"
import Aoc1501 from "./includesAoc/Aoc1501"
import DadJokes from "./includesAoc/DadJokes"
import './styles/App.scss'

type TargetRoute = React.FC

const routes: { [key: string]: TargetRoute } = {
  '2210': Aoc2210,
  '1802': Aoc1802,
  '1502': Aoc1502,
  '1501': Aoc1501,
  'DadJokes': DadJokes,
}

function App() {
  const [ route, setRoute ] = useState<string>( Object.keys(routes)[Math.floor(Math.random() * Object.keys(routes).length)] )

  const handleSetRoute = (r: string) => {
    setRoute(r)
  }
  const TargetRoute = routes[route]

  return (
    <>
      <h2>Hello World</h2>
      <div className='nav'>
        <button 
          className='btn' 
          onClick={()=>handleSetRoute('1501')} >
          15:01
        </button>
        <button 
          className='btn' 
          onClick={()=>handleSetRoute('1502')} >
          15:02
        </button>
        <button 
          className='btn' 
          onClick={()=>handleSetRoute('1802')} >
          18:02
        </button>
        <button 
          className='btn' 
          onClick={()=>handleSetRoute('2210')} >
          22:10
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
