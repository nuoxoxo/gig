import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const URL:string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2301.in"

var Aoc2301 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [p1] = useState<number>(0)
  const [p2] = useState<number>(0)

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const Solver = () => {
    
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    Solver()
  }, [lines])

  return (
    <>
      {lines ? (
        <div className='playground playground-2003'>
          <div className="field res-field">
            <span>--- 2301 Day 1: Trebuchet?! ---</span>
            <span>Part 1: {p1?p1:'(no solution available)'}</span>
            <span>Part 2: {p2?p2:'(no solution available)'}</span>
          </div>

          <div className="field data-field data-field-2301">
            {lines
              ? lines.length === 1
                ? LenNStrsFromLine(lines[0], 16).join("\n")
                : lines.join("\n")
              : "No data available."}
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2301
