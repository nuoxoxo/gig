import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const URL:string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2011.in"

var Aoc2011 = () => {
  const [lines, setLines] = useState<string[]>([])
  const [p1/*, setP1*/] = useState<number>(0)
  const [p2/*, setP2*/] = useState<number>(0)

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
            <span>--- 2020 Day 11: Seating System ---</span>
            <span>Part 1: {p1?p1:'(no solution available)'}</span>
            <span>Part 2: {p2?p2:'(no solution available)'}</span>
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
                  lines/*.map((line) => line.split("").join(" "))*/.join("\n")
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
