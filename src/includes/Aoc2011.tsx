import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const URL:string = "https://raw.githubusercontent.com/nuoxoxo/in/main/2011.in"

var Aoc2011 = () => {
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
      {lines ? (
        <div className='playground playground-2011'>
          <div className="field res-field">
            <span>--- 2022 Day 12: Hill Climbing Algorithm ---</span>
            <span>Part 1: (empty)</span>
            <span>Part 2: (empty)</span>
          </div>
          {/*
          <div className="field data-field data-field-2011">
            { p2Grid
              ? p2Grid.map((line) => line.split("").join(" ")).join("\n")
              : "No data available."}
          </div>

          <div className="field data-field data-field-2011">
            { p1Grid
              ? p1Grid.map((line) => line.split("").join(" ")).join("\n")
              : "No data available."}
          </div>

          <div className="field data-field data-field-2011">
            { P2Path
              ? P2Path.map((line) => line.split("").join(" ")).join("\n")
              : "No data available."}
          </div>
          */}

          <div className="field data-field data-field-2011">
            {lines
              ? lines.length === 1
                ? LenNStrsFromLine(lines[0], 16).join("\n")
                : // : lines.join("\n")
                  lines.map((line) => line.split("").join(" ")).join("\n")
              : "No data available."}
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2011
