import { useState, useEffect } from "react"
import { FetchDataWithoutTrim, /*Deepcopy2DArray*/ } from "../helpers/Helpers"

const suffixes = ['in', 'alt']
const choice = suffixes[Math.floor(Math.random() * suffixes.length)]
const URL:string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/1813." + choice

var Aoc1813 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [p1] = useState<number>(0)
  const [p2] = useState<number>(0)

  const handleData = async () => {

    try {
      const raws = await FetchDataWithoutTrim(URL)
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
              <span>--- 2018 Day 13: Mine Cart Madness ---</span>
              <span>Part 1: {p1 ? p1 : "(empty)"} </span>
              <span>Part 2: {p2 ? p2 : "(empty)"} </span>
            </div>
          </div>

          <div className="field data-field data-field-1813">
            { lines ? lines.join("\n") : "No data available." }
          </div>

        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc1813
