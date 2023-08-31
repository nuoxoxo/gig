import { useState, useEffect } from "react"
import {
  FetchData,
  LenNStrsFromLine,
  // Deepcopy2DArray,
} from "../helpers/Helpers"

const URL: string = 
  "https://raw.githubusercontent.com/nuoxoxo/in/main/2222.in"

var Aoc2222 = () => {
  const [lines, setLines] = useState<string[]>([])
  const [surface, setSurface] = useState<string[]>([])
  const [course, setCourse] = useState<string>()
  const [p1, /*setP1*/] = useState<number>(0)
  const [p2, /*setP2*/] = useState<number>(0)

  const handleData = async () => {

    try {
      const raws = await FetchData(URL)
      setLines(raws)
      const idx = raws.indexOf('')
      if (idx === -1) {
        throw new Error("what why !?");
      }
      let surf:string[] = raws.splice(0, idx)
      let cour:string = raws.splice(idx + 1)[0]
      // console.log(surf.length, cour.length)
      setSurface(surf)
      setCourse(cour)
      
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  useEffect(() => {
    handleData()
    // console.log(lines, lines.length, lines[1].length)
  }, [])

  return (
    <>
      { lines ? lines.join('\n') : 'something is wrong' }
      { lines && surface && course ? (
        <>

          <div className="playground">
            <div className="field res-field">
              <span>--- 2222 Day 5: Hydrothermal Venture ---</span>
              <span>Part 1: {p1 ? p1 : "(empty)"} </span>
              <span>Part 2: {p2 ? p2 : "(empty)"} </span>
            </div>
          </div>

          <div className="field data-field data-field-2222">
            {
              surface 
              ? surface.join("\n") 
              : "No data available."
            }
          </div>

          <div className="field data-field data-field-2222">
            {
              course 
              ? LenNStrsFromLine(course[0], 16).join("\n")
              : "No data available."
            }
          </div>

        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2222
