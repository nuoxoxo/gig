import { useState, useEffect } from "react"
import { FetchDataWithoutTrim, /*Deepcopy2DArray*/ } from "../helpers/Helpers"

const suffixes = ['in', 'alt']
const choice = suffixes[Math.floor(Math.random() * suffixes.length)]
const URL:string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2310." + choice

var Aoc2310 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [p1] = useState<number>(0)
  const [p2] = useState<number>(0)

  const handleData = async () => {

    try {
      const raws = await FetchDataWithoutTrim(URL)
      let i = -1
      while (++i < raws.length) {
        raws[i] = raws[i]
                  .replace(/7/g, '┐')
                  .replace(/-/g, '─')
                  .replace(/L/g, '└')
                  .replace(/F/g, '┌')
                  .replace(/J/g, '┘')
                  .replace(/\./g, ' ')
      }
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
            <div className="field res-field res-field-1813">
              <span>--- 2023 Day 10: Pipe Maze ---</span>
              <span>Part 1: {p1 ? p1 : "(empty)"} </span>
              <span>Part 2: {p2 ? p2 : "(empty)"} </span>
            </div>
          </div>

          <div className="field data-field data-field-2310">
            { lines ? lines.join("\n") : "No data available." }
          </div>

        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2310
