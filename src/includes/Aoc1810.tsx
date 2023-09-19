import { useState, useEffect } from "react"
import {
  FetchData,
  // LenNStrsFromLine,
  // Deepcopy2DArray,
} from "../helpers/Helpers"

const URL: string = 
  "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/1810.0"

var Aoc1810 = () => {
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
        <>

          <div className="playground">
            <div className="field res-field">
              <span>--- 2018 Day 10: The Stars Align ---</span>
              {/* <span>Part 1: {p1 ? p1 : "(empty)"} </span> */}
              {/* <span>Part 2: {p2 ? p2 : "(empty)"} </span> */}
            </div>
          </div>

          <div className="field data-field data-field-2021">
            { lines ? lines.join("\n") : "No data available." }
          </div>

        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc1810
