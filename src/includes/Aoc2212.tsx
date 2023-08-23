import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const path = "https://raw.githubusercontent.com/nuoxoxo/in/main/2212.in"

var Aoc2212 = () => {
  const [lines, setLines] = useState<string[]>([])
  const [p1, setP1] = useState<number>(0)
  const [p1Grid, setP1Grid] = useState<string[]>([])
  // const [p2, setP2] = useState<number>(0)

  const handleData = async () => {
    try {
      const raws = await FetchData(path)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const BFS = (
    aa: number[][],
    sr: number,
    sc: number,
    er: number,
    ec: number
  ) => {
    let [R, C]: number[] = [lines.length, lines[0].length]
    const D: [number, number][] = [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ]
    let seen: boolean[][] = Array.from({ length: R }, () =>
      Array(C).fill(false)
    )
    let mp: number[][] = Array.from({ length: R }, () => Array(C).fill(0))

    let dq: number[][] = [[sr, sc]]
    while (dq.length !== 0) {
      let [r, c]: number[] = dq.shift() || []
      for (let dir of D) {
        let rr: number = r + dir[0]
        let cc: number = c + dir[1]
        if (rr < 0 || rr > R - 1 || cc < 0 || cc > C - 1) {
          continue
        }
        if (seen[rr][cc]) {
          continue
        }
        if (aa[rr][cc] - aa[r][c] > 1) {
          continue
        }
        seen[rr][cc] = true
        mp[rr][cc] = mp[r][c] + 1
        dq.push([rr, cc])
      }
    }
    let Grid: string[] = []
    let tempGrid: string[][] = Array.from({ length: R }, () =>
      Array(C).fill(".")
    )
    let i: number = -1
    while (++i < mp.length) {
      let mini: number = Math.max(...mp[i])
      let j: number = -1
      while (++j < mp[i].length) {
        if (mp[i][j] == mini) {
          tempGrid[i][j] = "#"
        }
      }
    }
    for (let row of tempGrid) {
      Grid.push(row.join(""))
    }
    setP1(mp[er][ec])
    setP1Grid(Grid)
  }

  const Solver_Part_One = () => {
    if (lines === undefined || lines[0] === undefined) return
    let aa: number[][] = []
    let [R, C]: number[] = [lines.length, lines[0].length]
    let [sr, sc, er, ec]: number[] = [-1, -1, -1, -1]
    let r: number = -1
    let c: number
    while (++r < R) {
      let temp: number[] = []
      c = -1
      while (++c < C) {
        let n: number
        if (lines[r][c] == "S") {
          [sr, sc] = [r, c] // find start
          n = 0
        } else if (lines[r][c] == "E") {
          [er, ec] = [r, c] // find end
          n = 26 // ?
        } else {
          n = lines[r][c].charCodeAt(0) - "a".charCodeAt(0)
        }
        temp.push(n)
      }
      aa.push(temp)
    }
    BFS(aa, sr, sc, er, ec)
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    Solver_Part_One()
    // Solver_Part_Two()
  }, [lines])

  return (
    <>
      {lines ? (
        <>
          <div className="field res-field">
            <span>--- 2022 Day 12: Hill Climbing Algorithm ---</span>
            <span>Part 1: {p1}</span>
            <span>Part 2: </span>
          </div>

          <div className="playground playground-2212">
            <div className="field data-field data-field-2212">
              {lines
                ? lines.length === 1
                  ? LenNStrsFromLine(lines[0], 16).join("\n")
                  : lines.join("\n")
                : // : lines.map(line => line.toUpperCase()).join('\n')
                  "No data available."}
            </div>
            <div className="field data-field data-field-2212">
              {p1Grid ? p1Grid.join("\n") : "No data available."}
            </div>
          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2212