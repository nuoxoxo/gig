import { useState, useEffect } from 'react'
import { FetchData } from './FetchData'

function App() {

  const path = 
  'https://raw.githubusercontent.com/nuoxoxo/in/main/jokes.in'

  const [loading, setLoading] = useState<boolean>( true )
  const [lines, setLines] = useState<string[]>( [] )
  const [index, setIndex] = useState<number>( 0 )


  const handleData = async () => {
    try {
      let raws: string[] = await FetchData( path )
      raws = raws.map(item => item.replace(/<br\s*[\/]?>/gi, '\n'))
      setLines(raws)
      setLoading(false)
    } catch (error: any) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  }

  useEffect( () => {
    handleData()
  }, [])

  const handleClick = () => {

    let randIdx = Math.floor(Math.random() * lines.length)
    while (randIdx === index) {
      randIdx = Math.floor(Math.random() * lines.length)
    }
    setIndex(randIdx)
  }

  return (
    <div className='container' onClick={handleClick} 
      // style={{display: 'flex',
      // userSelect: 'none',
      // cursor: 'pointer',
      // justifyContent: 'center',
      // alignContent: 'center',
      // marginLeft: '6vh',
      // marginRight: '6vh',
      // marginTop: '33%',
      // marginBottom: '10%',}}
      >
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className='dad-jokes-text'>
          <span>
            { lines ? lines[Math.floor(Math.random() * lines.length)] : 'No data available.' }
          </span>
        </div>
      )}
    </div>
  )
}

export default App
