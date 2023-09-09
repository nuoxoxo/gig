import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine, Deepcopy2DArray } from "../helpers/Helpers"

const URL:string = 
  "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/1608.in"

const charSet = ['○', '¾', '⅞', '░', '▒', '▓']//, '█']
const symbol = charSet[Math.floor(Math.random() * charSet.length)]

let isTest = false

const [W, T] = isTest ? [7, 3] : [50, 6]

var Aoc1608 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [p1, setP1] = useState<number>(0)
  const [p2Traces, setP2Traces] = useState<string[][][]>([])

  const handleData = async () => {
    try {
      const raws = isTest 
        ? ['rect 3x2', 'rotate column x=1 by 1', 'rotate row y=0 by 4', 'rotate column x=1 by 1']
        : await FetchData(URL)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const Solver = () => {


    let grid:string[][] = []
    let traces:string[][][] = []
    let i, j

    i = -1
    while (++i < T) {
      let temp:string[] = []
      j = -1
      while (++j < W) {
        temp.push(' ')
      }
      grid.push(temp)
    }

    for (let line of lines) {

      let arr:string[] = line.split(' ')
      let cmd = arr[0] // rotate OR rect


      if (cmd === 'rotate') {
        cmd = arr[1] // columm OR row
        let pos = parseInt(arr[2].split('=')[1]) // '2' in 'y=2'  // BUG found and fixed
        let stp = parseInt(arr[4]) // steps '10'

        // console.log(line, cmd, pos, stp) // TEST parsing 

        if (cmd === 'column') {
          while (stp--) {
            let char = grid[T - 1][pos] // folding
            i = T
            while (--i > -1) {
              if (i === 0) {
                grid[i][pos] = char
              } else {
                grid[i][pos] = grid[i - 1][pos]
              }
            }
          }
        } else if (cmd === 'row') {
          while (stp--) {

            // console.log(grid, line, pos) // TEST weird bug

            let char = grid[pos][W - 1]; // folding
            i = W
            while (--i > -1) {
              if (i === 0) {
                grid[pos][i] = char
              } else {
                grid[pos][i] = grid[pos][i - 1]
              }
            }
          }
        }
      } else if (cmd === 'rect') {
        let temp:string[] = arr[1].split('x')
        let a = parseInt(temp[0])
        let b = parseInt(temp[1])

        // console.log(line, cmd, a, b) // TEST parsing 

        i = -1
        while (++i < b) {
          j = -1
          while (++j < a) {
            grid[i][j] = symbol
          }
        }
      }
      traces.unshift(Deepcopy2DArray(grid))
    }

    let res = 0
    for (let line of grid) {
      res += line.filter((c) => c === symbol).length
    }
    setP1(res)
    setP2Traces(traces)

  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    Solver()
  }, [lines])

  return (
    <>
      { lines ? (
        <div className="playground">
          <div className="field res-field"
          >
            <span>--- 2016 Day 8: Two-Factor Authentication ---</span>
            <span>Part 1: {p1?p1:'(empty)'} </span>
            <span>Part 2: </span>
            <span className="res-field-1608-image">
              { p2Traces.map((trace) => trace.map((t) => t.join('')).join('\n')).join('\n\n') }
            </span>
          </div>
          <div className="field data-field data-field-1608" >
            { lines
              ? lines.length === 1
                ? LenNStrsFromLine(lines[0], 16).join("\n")
                : 
                  // Either
                  lines.join('\n')

                  // Or
                  // lines.map(
                  // (line, n) => {
                  //   let index:string
                  //   if (n < 10) {
                  //     index = `00${n}`
                  //   } else if (n < 100) {
                  //     index = `0${n}`
                  //   } else  {
                  //     index = `${n}`
                  //   }
                  //   return `(${index}) ${line}`
                  // }).join("\n")

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
