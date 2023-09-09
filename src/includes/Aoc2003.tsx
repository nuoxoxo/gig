import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine, /*Deepcopy2DArray,*/ } from "../helpers/Helpers"

const URL: string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2003.in"
const symbolArr =  ['█', '⬤', '🔵', '🟡', '🟢', '🌕', 
  '🎾', '⭕', '🈵', '🈶', '🍊', '🦁', '🐯']
const symbol = symbolArr[Math.floor(Math.random() * symbolArr.length)]
const tempSymbol = '_'

var Aoc2003 = () => {

  const [lines, setLines] = useState<string[]>([])

  const [p1, setP1] = useState<number>(0)
  const [grid1, setGrid1] = useState<string[]>([])

  const [p2, setP2] = useState<number>(0)
  const [grid2, setGrid2] = useState<string[]>([])

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const countTrees = (g: string[], R: number, D: number): number => {

    let res: number = 0
    let i: number = 0
    let j: number = 0

    while (i < lines.length) {
      g[i] = g[i].substring(0, j) + tempSymbol + g[i].substring(j + 1)
      if (lines[i][j] === '#') {
        // g[i] = g[i].substring(0, j) + tempSymbol + g[i].substring(j + 1)
        res++
      }
      if (j + R < lines[i].length) {
        j += R
      } else {
        j = (j + R) % lines[i].length
      }
      i += D
    }
    return res
  }

  const Solver = () => {
    let g1: string[] = [...lines]
    let g2: string[] = [...lines]
    setP1(countTrees(g1, 3, 1))
    setGrid1(g1)

    let res2 = 
      countTrees(g2, 3, 1)
      * countTrees(g2, 1, 1)
      * countTrees(g2, 5, 1)
      * countTrees(g2, 7, 1)
      * countTrees(g2, 1, 2)

    setP2(res2)
    setGrid2(g2)
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
        <div className='playground playground-2003'>
          <div className="field res-field">
            <span>--- 2020 Day 3: Toboggan Trajectory ---</span>
            <span>Part 1: {p1?p1:'(empty)'} </span>
            <span>Part 2: {p2?p2:'(empty)'} </span>
          </div>
          <div className='field data-field data-field-2003'>
            <div className='data-field-2003-children'>
              {lines
                ? lines.length === 1
                  ? LenNStrsFromLine(lines[0], 16).join("\n")
                  : lines.join("\n")
                : "No data available."}
            </div>
            <div className='data-field-2003-children'>
              { grid1.map( line => line.split(tempSymbol).join(symbol) ).join('\n') }
            </div>
            <div className='data-field-2003-children'>
              { grid2.map( line => line.split(tempSymbol).join(symbol) ).join('\n') }
            </div>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2003
