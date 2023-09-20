import { useState, useEffect } from "react"
import { FetchData } from "../helpers/Helpers"

const URL: string = 
  "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2105.in"

var Aoc2105 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [V, setVent] = useState<number[][]>([])
  const [p1, setP1] = useState<number>(0)
  const [p2, setP2] = useState<number>(0)

  const handleData = async () => {

    try {
      const raws = await FetchData(URL)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const PreSolver = () => {

    let parsed: number[][] = []
    for (let line of lines) {
      let match = line.match(/(\d+),(\d+) -> (\d+),(\d+)/)
      if (match) {
        match.shift() // pop the 1st element returned by .match()
        let temp: number[] = []
        for (let n of match) {
          temp.push(parseInt(n))
        }
        parsed.push(temp)
      }
    }
    setVent(parsed)
  }

  const Solver = () => {

    //  Part 1

    let grid:number[][] = Array.from(
      { length: 1000 },
      () => Array.from({ length: 1000 }, () => 0)
    )

    let L:number // start
    let R:number // finish
    let i:number = -1
    let j:number

    let res:number = 0

    while (++i < V.length) {
      if (V[i][0] === V[i][2]) {
        L = V[i][1]
        R = V[i][3]
        if (L > R) {
          [L, R] = [R, L]
        }
        j = L - 1
        while (++j <= R) {
          grid[V[i][0]][j] += 1
        }
      } else if (V[i][1] === V[i][3]) {
        L = V[i][0]
        R = V[i][2]
        if (L > R){
          [L, R] = [R, L]
        }
        j = L - 1
        while (++j <= R)
          grid[j][ V[i][1] ] += 1
      }
    }
    for (let row of grid) {
      for (let cell of row) {
        if (cell > 1) {
          res += 1
        }
      }
    }
    setP1(res)

    // Part 2

    if (!res) {
      return
    }

    let res2: number = 0
    for (let line of V) {
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
          grid[x][y] += 1
          x += dx
          y += dy
        }
      }
    }
    for (let row of grid) {
      for (let cell of row) {
        if (cell > 1) {
          res2 += 1
        }
      }
    }
    setP2(res2)
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    PreSolver()
  }, [lines])

  useEffect(() => {
    Solver()
  }, [V])

  return (
    <>
      {lines ? (
        <>

          <div className="playground">
            <div className="field res-field">
              <span>--- 2021 Day 5: Hydrothermal Venture ---</span>
              <span>Part 1: {p1 ? p1 : "(empty)"} </span>
              <span>Part 2: {p2 ? p2 : "(empty)"} </span>
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

export default Aoc2105
