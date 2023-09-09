import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const URL:string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2212.in"

const symbolArr = ["○", '✲', '✳', '✵', '✶', '✻', '✼']
const symbol = symbolArr[Math.floor(Math.random() * symbolArr.length)]
const denseSymbol = 'x'//symbolArr[Math.floor(Math.random() * symbolArr.length)]
const density:number = 170

var Aoc2212 = () => {
  const [lines, setLines] = useState<string[]>([])

  const [p1, setP1] = useState<number>(0)
  const [p1Grid, setP1Grid] = useState<string[]>([])

  const [p2, setP2] = useState<number>(0)
  const [p2Grid, setP2Grid] = useState<string[]>([])
  const [P2Path, setP2Path] = useState<string[]>([])

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const BFS_1 = (
    arr: number[][],
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
        if (arr[rr][cc] - arr[r][c] > 1) {
          continue
        }
        seen[rr][cc] = true
        mp[rr][cc] = mp[r][c] + 1
        dq.push([rr, cc])
      }
    }
    let Grid: string[] = []
    let tempGrid: string[][] = Array.from({ length: R }, () =>
      Array(C).fill(" ")
    )
    let i: number = -1
    while (++i < mp.length) {
      let j: number = -1
      while (++j < mp[i].length) {
        if (mp[i][j] > 170) {
          tempGrid[i][j] = symbol
        }
      }
    }

    for (let row of tempGrid) {
      Grid.push(row.join(""))
    }
    setP1(mp[er][ec])
    setP1Grid(Grid)
  }

  const BFS_2 = (
    arr: number[][],
    sr: number,
    sc: number,
    er: number,
    ec: number
  ) => {
    let res: number = 1e9
    let [R, C]: number[] = [lines.length, lines[0].length]
    const D: [number, number][] = [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ]

    let parentCoordinates: number[][][] = Array.from({ length: R }, () =>
      Array(C).fill([])
    )

    let seen: boolean[][] = Array.from({ length: R }, () =>
      Array(C).fill(false)
    )
    let mp: number[][] = Array.from({ length: R }, () => Array(C).fill(0))
    let Grid: string[] = []
    let Path: string[] = []
    let tempGrid: string[][] = Array.from({ length: R }, () =>
      Array(C).fill(" ")
    )
    let tempPath: string[][] = Array.from({ length: R }, () =>
      Array(C).fill(".")
    )
    let dq: number[][] = [[er, ec]]
    let [r, c]: number[] = [-1, -1]
    while (dq.length !== 0) {
      [r, c] = dq.shift() || []
      for (let dir of D) {
        let rr: number = r + dir[0]
        let cc: number = c + dir[1]
        if (rr < 0 || rr > R - 1 || cc < 0 || cc > C - 1) {
          continue
        }
        if (arr[rr][cc] === 0 && mp[rr][cc] !== 0) {
          res = Math.min(res, mp[rr][cc])
        }
        if (seen[rr][cc]) {
          continue
        }
        if (arr[r][c] - arr[rr][cc] > 1) {
          continue
        }
        seen[rr][cc] = true
        mp[rr][cc] = mp[r][c] + 1
        dq.push([rr, cc])

        parentCoordinates[rr][cc] = [r, c]
      }
    }

    [r, c] = [sr, sc]
    while (true) {
      let [x, y] = parentCoordinates[r][c]
      if (r === er && c === ec) {
        break
      }
      tempGrid[r][c] = denseSymbol;
      [r, c] = [x, y]
    }

    // rotated p2Grid
    /*
    let rotated = []
    c = tempGrid[0].length
    while (--c > -1) {
      let tempRotated = []
      r = -1
      while (++r < tempGrid.length) {
        tempRotated.push(tempGrid[r][c])
      }
      rotated.push(tempRotated)
    }
    tempGrid = rotated
    */

    // p2Grid
    let i: number = -1
    while (++i < mp.length) {
      let j: number = -1
      while (++j < mp[i].length) {
        if (mp[i][j] > density) {
          tempPath[i][j] = ' '
        }
      }
    }

    for (let row of tempGrid) {
      Grid.push(row.join(""))
    }
    for (let row of tempPath) {
      Path.push(row.join(""))
    }
    setP2(res)
    setP2Grid(Grid)
    setP2Path(Path)
  }

  const Solver = () => {
    if (lines === undefined || lines[0] === undefined) return
    let arr: number[][] = []
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
      arr.push(temp)
    }
    BFS_1(arr, sr, sc, er, ec)
    // BFS_1(Deepcopy2DArray(arr), sr, sc, er, ec)
    BFS_2(arr, sr, sc, er, ec)
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    Solver()
    // Solver_Part_Two()
  }, [lines])

  return (
    <>
      {lines ? (
        <>
        {/* <div className='playground playground-2212'> */}
          <div className="field res-field">
            <span>--- 2022 Day 12: Hill Climbing Algorithm ---</span>
            <span>Part 1: {p1}</span>
            <span>Part 2: {p2}</span>
          </div>
          <div className="playground playground-2212">

            <div className="field data-field data-field-2212">
              {/* { p2Grid ? p2Grid.join('\n') : "No data available." } */}
              { p2Grid
                ? p2Grid.map((line) => line.split("").join(" ")).join("\n")
                : "No data available."}
            </div>

            <div className="field data-field data-field-2212">
              {/* { p1Grid ? p1Grid.join("\n") : "No data available." } */}
              { p1Grid
                ? p1Grid.map((line) => line.split("").join(" ")).join("\n")
                : "No data available."}
            </div>

            <div className="field data-field data-field-2212">
              {/* { p2Grid ? p2Grid.join('\n') : "No data available." } */}
              { P2Path
                ? P2Path.map((line) => line.split("").join(" ")).join("\n")
                : "No data available."}
            </div>

            <div className="field data-field data-field-2212">
              {lines
                ? lines.length === 1
                  ? LenNStrsFromLine(lines[0], 16).join("\n")
                  : // : lines.join("\n")
                    lines.map((line) => line.split("").join(" ")).join("\n")
                : "No data available."}
            </div>
          </div>
        {/* </div> */}
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2212
