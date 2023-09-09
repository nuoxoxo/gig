import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const URL: string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2223.1"

var Aoc2223 = () => {
  const [lines, setLines] = useState<string[]>([])
  const [gridPart1, setGridPart1] = useState<string[][]>([])
  const [p1, setP1] = useState<number>(0)
  const [set1, setSet1] = useState<Set<number[]>>(new Set<number[]>())
  const [p2 /*, setP2*/] = useState<number>(0)

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const prepare_state_for_printing = (state:Set<number[]>): string[] | undefined => {
    if (!state.size)
      return 
    const stateArray = [ ... state]
    const min_x = stateArray.length > 0 ? Math.min(...stateArray.map(x => x[0])) : undefined
    const min_y = stateArray.length > 0 ? Math.min(...stateArray.map(x => x[1])) : undefined
    const max_x = stateArray.length > 0 ? Math.max(...stateArray.map(x => x[0])) : undefined
    const max_y = stateArray.length > 0 ? Math.max(...stateArray.map(x => x[1])) : undefined
    console.log(min_x, min_y, max_x, max_y)
    let G:string[] = []
    let x = min_x! - 1
    while (++x < max_x! + 1) {
      let s:string = ''
      let y = min_y! - 1
      while (++y < max_y! + 1) {
        if (state.has([x, y])) {
          s += '#'
        } else {
          s += '.'
        }
      }
      G.push(s)
    }
    return G
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    //  Prepare Part 1
    const input_1: Set<number[]> = new Set()
    let i, j

    i = -1
    while (++i < lines.length) {
      const row = lines[i].trim()
      j = -1
      while(++j < row.length) {
        if (row[j] === "#") {
          input_1.add([i, j])
        }
      }
    }

    setSet1(input_1)

    const dir_proposed: Record<string, number[][]> = {
      'N': [[-1, -1], [-1, 0], [-1, 1]],
      'E': [[-1, 1], [0, 1], [1, 1]],
      'S': [[1, -1], [1, 0], [1, 1]],
      'W': [[-1, -1], [0, -1], [1, -1]]
  }

    const dir_8sides:number[][] = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1]
    ]

    const D: Record<string, number[]> = {
      N: [-1, 0],
      E: [0, 1],
      S: [1, 0],
      W: [0, -1],
    }

    const scan_rotation = ["N", "S", "W", "E"]

    const get_proposal_set = (pos: number[], d: string) => {
      let ppl: Set<number[]> = new Set() // ppl : ProPosaL
      for (let [x, y] of dir_proposed[d]) {
        ppl.add([pos[0] + x, pos[1] + y])
      }
      return ppl
    }

    // Part 1
    let times = 10
    i = -1
    while (++i < times) {

      // let propose = new Object()
      const propose: Map<number[], number[][]> = 
        new Map<number[], number[][]>()

      // Step 1: stage proposal

      for (let pos of input_1) {
        let is_occupied = true
        for (let [x, y] of dir_8sides) {
          if (input_1.has([pos[0] + x, pos[1] + y])) {
            is_occupied = false
          }
        }
        // console.log(is_occupied) // always true ?
        if (is_occupied) {
          continue
        }
        for (let news of scan_rotation) {
          let move_to = get_proposal_set(pos, news)
          console.log('move to: ', move_to)
          let isDisjoint = true
          // state.isdisjoint(move_to) (original python)
          // Above code expressed in TS 👇
          for (let inp of input_1) {
            for (let mov of move_to) {
              if (inp === mov)
                isDisjoint = false
            }
          }
          if (isDisjoint) {
            let dest = [pos[0] + D[news][0], pos[1] + D[news][1]]
            if (propose.has(dest)) {
              let current_proposals = propose.get(dest)
              current_proposals!.push(pos)
              propose.set(dest, current_proposals!)
            } else {
              propose.set(dest, [pos])
            }
            break 
          }
        }
      }

      // Step 2: next state

      for (let [pos, pp] of propose.entries()) {
        console.log(i, pos, pp)
        if  (pp.length !== 1) {
          continue
        }
        let old = pp[0]
        input_1.delete(old)
        input_1.add(pos)
      }
      scan_rotation.push(scan_rotation.shift()!)
    }
    const stateArray = [...input_1]
    const min_x = stateArray.length > 0 ? Math.min(...stateArray.map(x => x[0])) : undefined
    const min_y = stateArray.length > 0 ? Math.min(...stateArray.map(x => x[1])) : undefined
    const max_x = stateArray.length > 0 ? Math.max(...stateArray.map(x => x[0])) : undefined
    const max_y = stateArray.length > 0 ? Math.max(...stateArray.map(x => x[1])) : undefined
    let completeTiles = ((max_x! - min_x!) + 1) * ((max_y! - min_y!) + 1)
    let OccupiedTiles = input_1.size
    setP1(completeTiles - OccupiedTiles)
    setGridPart1([...gridPart1, prepare_state_for_printing(input_1)!])
  }, [lines])

  // useEffect(() => {
  //   Solver_Part_One()
  //   Solver_Part_Two()
  // }, [lines])

  return (
    <>
      {lines ? (
        <div className="playground playground-2223">

          <div className="field res-field">
            <span>--- 2022 Day 23: Unstable Diffusion ---</span>
            <span>Part 1: {p1 ? p1 : "(empty)"}</span>
            <span>Part 2: {p2 ? p2 : "(empty)"}</span>
            <span>{
              gridPart1
                ? gridPart1[1] : 'lol'
            }</span>
          </div>

          <div className="playground">

            <div className="field data-field data-field-2223">
              {lines
                ? lines.length === 1
                  ? LenNStrsFromLine(lines[0], 16).join("\n")
                  : lines.join("\n")
                : "No data available."}
            </div>

            <div className="field data-field" style={{ fontSize: "8px" }}>
              {set1.size > 0
                ? Array.from(set1)
                    .map(([x, y]) => `(${x},${y})`)
                    .join("")
                : "No data available."}
            </div>

          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2223
