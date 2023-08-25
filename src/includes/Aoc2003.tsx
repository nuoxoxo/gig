import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine, /*Deepcopy2DArray*/ } from "../helpers/Helpers"

const URL:string = 
  "https://raw.githubusercontent.com/nuoxoxo/in/main/2003.in"

var Aoc2003 = () => {

  const [lines, setLines] = useState<string[]>([])

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  useEffect(() => {
    handleData()
  }, [])

  return (
    <>
      { lines ? (
        <div className="playground">
          <div className="field res-field"
          >
            <span>--- 2020 Day 3: Toboggan Trajectory ---</span>
            <span>Part 1: (empty) </span>
            <span>Part 2: (empty) </span>
          </div>
          <div className="field data-field data-field-2021" > {/* Using 2021, subject to mod after */}
            { lines
              ? lines.length === 1
                ? LenNStrsFromLine(lines[0], 16).join("\n")
                : lines.join('\n')
              : "No data available."}
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2003
