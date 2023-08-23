import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const URL:string = 
  "https://raw.githubusercontent.com/nuoxoxo/in/main/1608.in"

// const denseChars:string[] = ['@']//, '▓', '✲', '✳', '✴', '✵', '✶', '✷', '✸', '✹', '✺', '✻', '✼', '✽', '✾', '✿', '❀']

// const denseChar:string = denseChars[Math.floor(Math.random() * denseChars.length)]


var Aoc1608 = () => {

  const [lines, setLines] = useState<string[]>([])

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      setLines(raws)
      console.log('here')
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  // const Solver_Part_One = () => {
  // }

  // const Solver_Part_Two = () => {
  // }

  useEffect(() => {
    handleData()
  }, [])

  // useEffect(() => {
  //   Solver_Part_One()
  //   // Solver_Part_Two()
  // }, [lines])

  // useEffect(() => {
  //   // Solver_Part_One()
  //   Solver_Part_Two()
  // }, [lines])

  return (
    <>
      { lines ? (
        <div className="playground">
          <div className="field res-field res-field-1608-image"
          >
            <span>--- 2016 Day 8: Two-Factor Authentication ---</span>
            <span>Part 1: (empty)</span>
            <span>Part 2: (empty)</span>
          </div>
          <div className="field data-field res-field-1608-image" >
            { lines
              ? lines.length === 1
                ? LenNStrsFromLine(lines[0], 16).join("\n")
                : lines.map((line, index) => `(${index}) ${line}`).join("\n")
              : "No data available."}
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc1608
