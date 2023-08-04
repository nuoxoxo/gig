import { useState, useEffect } from 'react'
import { FetchData } from './FetchData'
import { BrowserRouter as Router } from "react-router-dom"

const path = 
  'https://raw.githubusercontent.com/nuoxoxo/in/main/2113.in'

var Route2113 = () => {

  const [loading, setLoading] = useState<boolean>( true )
  const [lines, setLines] = useState<string[]>( [] )

  const handleData = async () => {
    try {
      const raws = await FetchData( path )
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

  return (
    <Router basename={import.meta.env.DEV ? "/gig/" : "/gig/route2113/"}>
      <>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <div className='container-L'>
            <pre>
              { lines ? lines.join('\n') : 'No data available.' }
            </pre>
          </div>
        )}
      </>
    </Router>
  )
}

export default Route2113
