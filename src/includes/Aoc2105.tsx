import { useState, useEffect } from "react"
import { FetchData, /*LenNStrsFromLine,*/ /*Deepcopy2DArray*/ } from "../helpers/Helpers"

const URL:string = 
  "https://raw.githubusercontent.com/nuoxoxo/in/main/2105.in"

var Aoc2105 = () => {


  const [lines, setLines] = useState<string[]>([])
  const [parsedLines, setParsedLines] = useState<number[][]>([])
  const [p1/*, setP1*/] = useState<number>(0)
  const [p2/*, setP1*/] = useState<number>(0)

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      let parsedTemp:number[][] = []
      for (let line of raws) {

        let match = line.match(/(\d+),(\d+) -> (\d+),(\d+)/)

        if (match) {
          match.shift() // pop the 1st element returned by .match() which is the string itself
          let temp: number[] = []
          for (let n of match) {
            temp.push(parseInt(n)) 
          }
          parsedTemp.push(temp)
        }
      }
      setParsedLines(parsedTemp)
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

            <div>{parsedLines&&parsedLines[0]?`len: ${parsedLines.length} - ${parsedLines[0].join('; ')}`:"No data available."}</div>

            <span>Part 2: {p2 ? p2 : '(empty)'} </span>
            <div className="field data-field data-field-2021" > {/* Using 2021, subject to mod after */}
              { lines
                ? lines.join('\n')
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
