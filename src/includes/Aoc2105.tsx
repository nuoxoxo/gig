import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine, /*Deepcopy2DArray*/ } from "../helpers/Helpers"

const URL:string = 
  "https://raw.githubusercontent.com/nuoxoxo/in/main/2105.in"

var Aoc2105 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [p1/*, setLines*/] = useState<number>(0)
  const [p2/*, setLines*/] = useState<number>(0)


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
            <span>--- 2021 Day 5: Hydrothermal Venture ---</span>
            <span>Part 1: {p1 ? p1 : '(empty)'} </span>
            <span>Part 2: {p2 ? p2 : '(empty)'} </span>
            <div className="field data-field data-field-2021" > {/* Using 2021, subject to mod after */}
              { lines
                ? lines.length === 1
                  ? LenNStrsFromLine(lines[0], 16).join("\n")
                  : lines.join('\n')
                : "No data available."
              }
            </div>
          </div>

        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2105
