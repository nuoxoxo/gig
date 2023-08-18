import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const path = 
  "https://raw.githubusercontent.com/nuoxoxo/advent-of-code/main/_inputs/1908.0"

var Aoc1908 = () => {
  const [lines, setLines] = useState<string[]>([])
  // const [p1, setP1] = useState<number>(0)
  // const [p2, setP2] = useState<number>(0)

  const handleData = async () => {
    try {
      const raws = await FetchData(path)
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
        <>
          <div className="playground">
            <div className="field res">
              <span>--- 2019 Day 8: Space Image Format ---</span>
              <span>Part 1: </span>
              <span>Part 2: </span>
            </div>
            <div className="field data-field">
              { lines ? lines.length === 1 
                  ? LenNStrsFromLine(lines[0], 42).join("\n")
                  : lines.join("\n")
                : "No data available."
              }
            </div>
          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc1908
