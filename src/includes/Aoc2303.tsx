import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const suffixes = ['alt', 'in']
const choice = suffixes[Math.floor(Math.random() * suffixes.length)]

const URL: string =
  "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2303." + choice

var Aoc2303 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [linesWithBlocks, setLinesWithBlocks] = useState<string[]>([])
  const [p1, setPart1] = useState<number>(0)
  const [p2, setPart2] = useState<number>(0)

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      let LWB = []
      for (let i = 0; i < raws.length; i++) {
        let lwb = raws[i]
        lwb = lwb.split("*").join(" ").split(".").join("░")
        LWB.push(lwb)
      }
      setLines(raws)
      setLinesWithBlocks(LWB)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }


  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    // Solver()
    setPart1(0)
    setPart2(0)
  }, [lines])

  return (
    <>
      {lines ? (
        <div className='playground playground-2003' style={{textAlign:'center'}}>
          <div className="field res-field">
            <span>--- 2O23 Day 3: Gear Ratios ---</span>
            <span>Part 1: {p1?p1:'(no solution available)'}</span>
            <span>Part 2: {p2?p2:'(no solution available)'}</span>
          </div>

          <div className="field data-field data-field-2301" style={{fontSize:'11px',textAlign:'left'}}>
            {lines
              ? lines.length === 1
                ? LenNStrsFromLine(lines[0], 16).join("\n")
                : lines.join("\n")
              : "No data available."
            }
          </div>
          👆<br/>👇
          <div className="field data-field data-field-2301" style={{fontSize:'11px',textAlign:'left'}}>
            {linesWithBlocks
              ? lines.length === 1
                ? LenNStrsFromLine(linesWithBlocks[0], 16).join("\n")
                : linesWithBlocks.join("\n")
              : "No data available."
            }
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2303
