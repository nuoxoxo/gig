import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const URL:string = 
  "https://raw.githubusercontent.com/nuoxoxo/in/main/1608.in"

// charset from 22:12
const symbolArr = ["○", '✲', '✳', '✵', '✶', '✻', '✼']
const symbol = symbolArr[Math.floor(Math.random() * symbolArr.length)]
// const denseSymbol = symbolArr[Math.floor(Math.random() * symbolArr.length)]

var Aoc1608 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [p2Grid, setp2Grid] = useState<string[][]>([])

  const W:number = 50
  const T:number = 6

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const Solver = () => {
    let grid:string[][] = []
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
        let pos = parseInt(arr[2][2]) // '2' in 'y=2'
        let stp = parseInt(arr[4]) // steps '10'
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
            let char = grid[pos][W - 1] // folding
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
        i = -1
        while (++i < b) {
          j = -1
          while (++j < a) {
            grid[i][j] = symbol
          }
        }
      }
      setp2Grid(grid)
    }
  }

  // const Solver_Part_Two = () => {
  // }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    Solver()
    // Solver_Part_One()
    // Solver_Part_Two()
  }, [lines])

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
            <span>Part 1: (empty) </span>
            <span>Part 2: </span>
            <span>{ p2Grid.map((line) => line.join('')).join('\n') }</span>
          </div>
          <div className="field data-field res-field-1608-image" >
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
