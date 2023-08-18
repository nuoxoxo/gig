import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const path = "https://raw.githubusercontent.com/nuoxoxo/in/main/1502.in"

var Aoc1501 = () => {
  const [lines, setLines] = useState<string[]>( [] )
  const [p1, setP1] = useState<number>( 0 )
  const [p2, setP2] = useState<number>( 0 )

  const handleData = async () => {
    try {
      const raws = await FetchData(path)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const Solver = () => {
    if (lines === undefined || lines[0] === undefined)
      return
    let res1: number = 0
    let res2: number = 0
    for (let line of lines) {
      const [l, w, h] = line.split('x').map(Number)

      //  Part 1
      const surface: number = l * w + w * h + h * l
      const smallarea = Math.min(l * w, w * h, h * l)
      const area1 = surface * 2 + smallarea
      res1 += area1

      //  Part 2
      const largeside = Math.max(l, w, h);
      const peri = 2 * ((l + w + h) - largeside);
      const area2 = l * w * h + peri;
      res2 += area2;
    }
    setP1(res1)
    setP2(res2)
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    Solver()
  }, [lines])

  return (
    <>
      { lines ?
        <div className='playground'>
          <div className="field res-field">
            <span>--- 2015 Day 2: I Was Told There Would Be No Math ---</span>
            <span>Part 1: {p1}</span>
            <span>Part 2: {p2}</span>
          </div>
          <div className="field data-field">
            { lines
              ? lines.length === 1
                ? LenNStrsFromLine(lines[0], 16).join("\n")
                : lines.join("\n")
              : "No data available."}
          </div>
        </div>
        :
        <p>Loading data...</p>
      }
    </>
  )
}

export default Aoc1501
