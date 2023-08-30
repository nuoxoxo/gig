import { useState, useEffect } from "react"
import {
  FetchData, /*LenNStrsFromLine,*/ Deepcopy2DArray
} from "../helpers/Helpers"

const URL: string = "https://raw.githubusercontent.com/nuoxoxo/in/main/2105.in"

var Aoc2105 = () => {
  const [lines, setLines] = useState<string[]>([])
  const [v, setVent] = useState<number[][]>([])

  const [p1, setP1] = useState<number>(0)
  const [grid, setGrid] = useState<number[][]>([])

  const [p2, setP2] = useState<number>(0)

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      let parsed: number[][] = []
      for (let line of raws) {
        let match = line.match(/(\d+),(\d+) -> (\d+),(\d+)/)

        if (match) {
          match.shift() // pop the 1st element returned by .match() which is the string itself
          let temp: number[] = []
          for (let n of match) {
            temp.push(parseInt(n))
          }
          parsed.push(temp)
        }
      }
      setVent(parsed)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  /*
  const Solve_Part_One = () => {

    let g:number[][] = Array.from(
      { length: 1000 },
      () => Array.from({ length: 1000 }, () => 0)
    )
    let start:number
    let end:number
    let i:number = -1
    let j:number

    let res:number = 0

    while (++i < v.length) {
      if (v[i][0] === v[i][2]) {
        start = v[i][1]
        end = v[i][3]
        if (start > end) {
          [start, end] = [end, start]
        }
        j = start - 1
        while (++j <= end) {
          g[v[i][0]][j] += 1
        }
      } else if (v[i][1] === v[i][3])
      {
        start = v[i][0]
        end = v[i][2]
        if (start > end)
          [start, end] = [end, start]
        j = start - 1
        while (++j <= end)
          g[j][ v[i][1] ] += 1
      }
    }
    for (let row of g) {
      for (let cell of row) {
        if (cell > 1) {
          res += 1
        }
      }
    }
    setP1(res)
    setGrid(g)
  }

  const Solve_Part_Two = () => {

    let g:number[][] = Deepcopy2DArray(grid)
    let res:number = 0
    for (let line of v) {
      if (line[0] !== line[2] && line[1] !== line[3]) {
        let dx:number = 1
        let dy:number = 1;
        let [x, y, xx, yy] = [line[0], line[1], line[2], line[3]]
        if (x > xx) {
          dx = -dx
        }
        if (y > yy) {
          dy = -dy
        }
        while (x !== xx + dx) {
          g[x][y] += 1
          x += dx
          y += dy
        }
      }
    }
    for (let row of g) {
      for (let cell of row) {
        if (cell > 1) {
          res += 1
        }
      }
    }
    setP2(res)
    setGrid(g)
  }
  */

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    // Solve_Part_One()
    // Solve_Part_Two()
  }, [v])

  return (
    <>
      {lines ? (
        <div className="playground">
          <div className="field res-field">
            <span>--- 2021 Day 5: Hydrothermal Venture ---</span>
            <span>Part 1: {p1 ? p1 : "(empty)"} </span>
            {/* <div>{v && v[0] ? v[0].join(" ") : "No data available."}</div> */}
            <span>Part 2: {p2 ? p2 : "(empty)"} </span>
            {/* <div style={{ fontSize:'1px'}}>{grid && grid[0] ? grid.join('\n') : "No data available."}</div> */}
          </div>
          <div className="field data-field data-field-2021">
            { lines ? lines.join("\n") : "No data available." }
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2105
