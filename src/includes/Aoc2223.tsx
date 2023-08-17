import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const path = 
  "https://raw.githubusercontent.com/nuoxoxo/in/main/2223.in"

var Aoc2223 = () => {
  const [lines, setLines] = useState<string[]>([])
  // const [p1, setP1] = useState<number>(0)
  // const [p2, setP2] = useState<string>("")

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

  // useEffect(() => {
  //   Solver_Part_One()
  //   Solver_Part_Two()
  // }, [lines])

  return (
    <>
      {lines ? (
        <>
          <div className="field res">
            <span>--- 2022 Day 23: Unstable Diffusion ---</span>
            <span>Part 1: </span>
            <span>Part 2: </span>
          </div>
          <div className="playground">
            <div className="field data-field">
              { lines ? lines.length === 1 
                  ? LenNStrsFromLine(lines[0], 16).join("\n")
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

export default Aoc2223
