import { useState, useEffect } from "react"
import { FetchDataWithoutTrim, Deepcopy2DArray } from "../helpers/Helpers"

const suffixes = ['in', 'alt',]// ]
const choice = suffixes[Math.floor(Math.random() * suffixes.length)]
const URL:string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2310." + choice

var Aoc2310 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [lines2, setLines2] = useState<string[]>([])
  const [A, setA] = useState<string[]>([])
  const [PathUnusedPipes, setPathUnusedPipes] = useState<string[]>([])
  const [PathAllPipes, setPathAllPipes] = useState<string[][]>([])
  const [PathLandlock, setPathLandlock] = useState<string[][]>([])
  const [p1, setPart1] = useState<number>(0)
  const [p2, setPart2] = useState<number>(0)

  const handleData = async () => {

    try {
      const raws = await FetchDataWithoutTrim(URL)
      setLines(raws)
      setLines2(raws)
      let temp_A: string[] = []
      let i = -1
      while (++i < raws.length) {
        let temp = raws[i]
                  .replace(/7/g, '┐')
                  .replace(/-/g, '─')
                  .replace(/L/g, '└')
                  .replace(/F/g, '┌')
                  .replace(/J/g, '┘')
                  .replace(/\./g, ' ')
        temp_A.push(temp)
      }
      setA(temp_A)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    Solver()
  }, [lines])

  const checkTwoArraysAreEqual = (L:number[], R:number[]): boolean => {
    return L.length === R.length && L.every((val, idx) => val === R[idx])
  }

  const checkSetHas = (set: Set<number[]>, this_array: number[]): boolean => {
    for (let that_array of set)
      if (checkTwoArraysAreEqual(this_array, that_array))
        return true
    return false
  }

  const Solver = () => {

    let starting_point: number[][] = []
    if (lines === undefined || lines[0] === undefined) return
    let R = lines.length, C = lines[0].length
    let r = -1, c
    while (++r < R) {
      if (lines[r].includes('S')) {
        c = -1
        while (++c < C)
          if (lines[r][c] == 'S')
            starting_point.push([r, c])
      }
    }
    if (starting_point.length !== 1) throw new Error('starting points more than one !?')
    let Start: number[] | undefined = starting_point.pop()
    if (Start === undefined || Start.length === 0) return
    let Go: string[] = [ 'J|L', '7|F', 'J-7', 'L-F'] // order : UDLR
    let Get:string[] = [Go[1], Go[0], Go[3], Go[2]]
    let Deque: number[][] = [ Start ]
    let Seen: Set<number[]> = new Set()
    Seen.add(Start)
    // let Seen: Set<string> = new Set()
    // Seen.add(`${Start[0]},${Start[1]}`)
    // console.log('From:', Start)
    // console.log('Seen:', Seen)
    // console.log('BFS :', Deque)
    let dr = [-1, 1, 0, 0]
    let dc = [ 0, 0,-1, 1] // UDLR

    // Find what S is for part 2
    let SS: Set<string> = new Set(['-', '|', '7', 'F', 'L', 'J'])

    while (Deque.length > 0) {
      let rc: number[] | undefined = Deque.shift()
      if (rc === undefined) return
      let [r, c] = rc
      // console.log([r, c]) /// DBG
      let curr_pipe = lines[r][c]
      let i = -1
      while (++i < 4) {
        let rr = r + dr[i]
        let cc = c + dc[i]
        // console.log(checkSetHas(Seen, [rr,cc])) /// DBG
        if (checkSetHas(Seen, [rr,cc]) || ! (rr > -1 && rr < R && cc > -1 && cc < C))
          continue
        let next_pipe = lines[rr][cc]
        if ((Go[i]+'S').includes(curr_pipe) && Get[i].includes(next_pipe)) {
          Seen.add( [ rr,cc ])
          Deque.push([rr,cc ])
          // console.log('curr:', str, curr_pipe, 'next:', Get[i], next_pipe) /// DBG
          if (curr_pipe == 'S') {
            SS = new Set([...SS].filter(char => new Set((Go[i] + 'S').split('')).has(char)))
          }
        }
      }
    }
    setPart1(Math.floor(Seen.size / 2))

    // Part 2
    r = -1
    while (++r < R) {
      c = -1
      while (++c < C) {
        if (!checkSetHas(Seen, [r,c]))
          lines2[r] = lines2[r].slice(0, c) + '.' + lines2[r].slice(c + 1);
      }
    }
    // console.log(lines2)
    let OUT: Set<number[]> = new Set([])
    r = -1
    while (++r < R) {
      let inside = false
      let upward = false // is this strict true?
      c = -1
      while (++c < C) {
        let curr_pipe = lines2[r][c]
        if (curr_pipe == 'S')
          [curr_pipe] = SS
        if (curr_pipe == '|') {
          inside = !inside
        } else if (curr_pipe == 'L') {
          upward = true
        } else if (curr_pipe == 'F') {
          upward = false
        } else if (upward && curr_pipe == '7') {
          inside = ! inside
        } else if (!upward && curr_pipe == 'J') {
          inside = ! inside
        }
        if ( ! inside) {
          OUT.add([r, c])
        }
      }
    }
    let UNION: Set<number[]> = new Set([...OUT])
    for (let point of Seen) {
      if (!checkSetHas(UNION, point)) {
        UNION.add(point)
      }
    }
    let DIFFERENCE: Set<number[]> = new Set()
    r = -1
    while (++r < R) {
      c = -1
      while (++c < C) {
        if (!checkSetHas(UNION, [r,c])) {
          DIFFERENCE.add([r,c])
        }
      }
    }

    setPart2( R * C - UNION.size)

    // get pathi
    let temp_Path_Unused_Pipes: string[] = [...A]

    // get path 2 : an unused pipes
    let temp_Path_All_Pipes: string[][] = Array(R).fill(null).map(() => Array(C).fill(' '))

    // get 3 paths at the same time
    for (let coor of Seen) {
      let [r, c] = coor
      temp_Path_Unused_Pipes[r] = 
        temp_Path_Unused_Pipes[r].substring(0, c) + 
        ' ' + 
        temp_Path_Unused_Pipes[r].substring(c + 1)
      temp_Path_All_Pipes[r][c] = A[r][c]
    }
    temp_Path_Unused_Pipes[Start[0]] = 
      temp_Path_Unused_Pipes[Start[0]].substring(0, Start[1]) + 
      '█' + 
      temp_Path_Unused_Pipes[Start[0]].substring(Start[1] + 1)
    temp_Path_All_Pipes[Start[0]][Start[1]] = '█'

    setPathUnusedPipes(temp_Path_Unused_Pipes)
    setPathAllPipes(temp_Path_All_Pipes)

    // get path 3 : all landlocked area
    let temp_Path_Landlock:string[][]= Deepcopy2DArray(temp_Path_All_Pipes)
    for (let coor of DIFFERENCE) {
      let [r, c] = coor
      temp_Path_Landlock[r][c] = '▓'
    }

    setPathLandlock(temp_Path_Landlock)
  }
  return (
    <>
      {lines ? (
        <>
          <div className="playground">
            <div className="field res-field res-field-2310">
              <span>--- 2023 Day 10: Pipe Maze ---</span>
              <span>Part 1: {p1 ? p1 : "(Loading)"} </span>
              <span>Part 2: {p2 ? p2 : "(...it might be slow i know)"} </span>
            </div>
          </div>

          All Landlocked Seas<br/>
          <div className="field data-field data-field-2310">
            { PathLandlock ? PathLandlock.map(row => row.join('')).join('\n') : "No data available." }
          </div>

          <br/>These are Joined Pipes<br/>
          <div className="field data-field data-field-2310">
            { PathAllPipes ? PathAllPipes.map(row => row.join('')).join('\n') : "No data available." }
          </div>

          <br/>These are Invalid Pipes<br/><br/>
          <div className="field data-field data-field-2310">
            { PathUnusedPipes ? PathUnusedPipes.join("\n") : "No data available." }
          </div>

          <br/>Original Planning<br/><br/>
          <div className="field data-field data-field-2310">
            {/* { lines ? lines.join("\n") : "No data available." } */}
            { A ? A.join("\n") : "No data available." }
          </div>

        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2310
