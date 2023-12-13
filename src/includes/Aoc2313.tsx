import { useState, useEffect } from "react"
import { FetchDataWithoutTrim, Deepcopy2DArray } from "../helpers/Helpers"

const suffixes = ["in", "alt"] // 'test']
const choice = suffixes[Math.floor(Math.random() * suffixes.length)]
const URL: string =
  "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2313." + choice

var Aoc2313 = () => {
  const [A, setA] = useState<string[][][]>([])
  const [B, setB] = useState<string[][][]>([])
  const [C, setC] = useState<string[][][]>([])
  const [Coors, setCoors] = useState<number[][]>([]) // [ p1/p2 , nth_bloc, h/v, idx ]
  const [p1, setPart1] = useState<number>(0)
  const [p2, setPart2] = useState<number>(0)
  const [FinalB, setFinalB] = useState<string[][][]>([])
  const [FinalC, setFinalC] = useState<string[][][]>([])

  const handleData = async () => {
    try {
      const raws = await FetchDataWithoutTrim(URL)
      if (!raws[raws.length - 1].length) raws.pop()
      const lines: string[][][] = []
      const BB: string[][][] = []
      const CC: string[][][] = []
      let temp: string[][] = []
      for (const line of raws) {
        if (line.length == 0) {
          lines.push(temp)
          BB.push(Deepcopy2DArray(temp))
          CC.push(Deepcopy2DArray(temp))
          temp = []
        } else {
          temp.push(Array.from(line))
        }
      }
      if (temp.length) {
        lines.push(temp)
        BB.push(Deepcopy2DArray(temp))
        CC.push(Deepcopy2DArray(temp))
      }
      setA(lines)
      setB(BB)
      setC(CC)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    Solver()
  }, [A])

  useEffect(() => {
    Planner()
  }, [Coors, B, C])

  useEffect(() => {
    Renderer()
  }, [FinalB, FinalC])

  const Planner = () => {

    let PlanB: string[][][] = B.map((level_2) =>
      level_2.map((level_3) => level_3.map((char) => char))
    )
    let PlanC: string[][][] = C.map((level_2) =>
      level_2.map((level_3) => level_3.map((char) => char))
    )

    for (const coor of Coors) {
      let [part, nth_bloc, axis, index] = coor
      if (part === 1) {
        if (axis == 1) {
          // horizontal
          PlanB[nth_bloc].splice(
            index,
            0,
            Array(PlanB[nth_bloc][0].length).fill(["━"])
          )
        } else if (axis == 2) {
          //vertical
          for (let line of PlanB[nth_bloc]) {
            line.splice(index, 0, "┃")
          }
          let top = Array(PlanB[nth_bloc][0].length).fill([" "])
          top[index] = "┃"
          PlanB[nth_bloc].unshift(top)
          PlanB[nth_bloc].push(top)
        }
      } else if (part == 2) {
        if (axis == 1) {
          // horizontal
          PlanC[nth_bloc].splice(
            index,
            0,
            Array(PlanC[nth_bloc][0].length).fill(["━"])
          )
        } else if (axis == 2) {
          //vertical
          for (let line of PlanC[nth_bloc]) {
            line.splice(index, 0, "┃")
          }
          let top = Array(PlanC[nth_bloc][0].length).fill([" "])
          top[index] = "┃"
          PlanC[nth_bloc].unshift(top)
          PlanC[nth_bloc].push(top)
        }
      }
    }
    setFinalB(PlanB)
    setFinalC(PlanC)
  }

  const Solver = () => {
    let [res1, res2] = [0, 0]
    let coordinates: number[][] = []
    let p2 = true
    let lhs, rhs, axis
    let i = -1
    while (++i < A.length) {
      // for (const bloc of A) {

      // transpose it yea !
      // ++nth_bloc
      let bloc: string[][] = A[i]
      let tp: string[][] = bloc[0].map((_, col) => bloc.map((row) => row[col]))

      lhs = horver_calculator(bloc)
      rhs = horver_calculator(tp)
      res1 += lhs * 100 + rhs

      axis = lhs !== 0 ? 1 : 2
      coordinates.push([1, i, axis, lhs + rhs])

      lhs = horver_calculator(bloc, p2)
      rhs = horver_calculator(tp, p2)
      res2 += lhs * 100 + rhs

      axis = lhs !== 0 ? 1 : 2
      coordinates.push([2, i, axis, lhs + rhs])
    }

    setCoors(coordinates)
    setPart1(res1)
    setPart2(res2)
  }

  const horver_calculator = (bloc: string[][], part2 = false): number => {
    let index = 0
    let i = 0
    while (++i < bloc.length) {
      let diff = 0,
        u = i - 1,
        d = i
      let busted = false
      while (u > -1 && d < bloc.length) {
        let j = -1
        while (++j < bloc[0].length) {
          if (bloc[u][j] != bloc[d][j]) {
            diff += 1
          }
          if (diff > 1) {
            busted = true
            break
          }
        }
        if (busted) {
          break
        }
        u -= 1
        d += 1
      }
      if ((!part2 && diff == 0) || (part2 && diff == 1)) {
        index = i
        break
      }
    }
    return index
  }

  const Renderer = () => {
    return A.map((elemA, i) => {
      elemA = [
        Array(elemA[0].length).fill([" "]),
        Array(elemA[0].length).fill([" "]),
        ...(elemA || []),
      ]
      // 👆 unshift 2 blank lines now the left block (which is the orignal block) looks better
      const elemB = FinalB[i] || [];
      const elemC = FinalC[i] || [];

      // Return JSX or components if you want to render them
      return (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            paddingBottom: "21px",
          }}
        >
          <div>{elemA.map((row) => row.join("")).join("\n")}</div>
          <div>{elemB.map((row) => row.join("")).join("\n")}</div>
          <div>{elemC.map((row) => row.join("")).join("\n")}</div>
        </div>
      )
    })
  }

  return (
    <>
      {A ? (
        <>
          <div className="playground">
            <div className="field res-field res-field-2313">
              <span>--- 2O23 Day 13: Point of Incidence ---</span>
              <span>Part 1: {p1 ? p1 : "(empty)"} </span>
              <span>Part 2: {p2 ? p2 : "(empty)"} </span>
            </div>
          </div>
          <div className="field data-field data-field-2313">
            {/* <div>{combinedArrays}</div> */}
            <div>{Renderer()}</div>
            {/* <div>
              { A ? A
                .slice(Math.floor(A.length/2))
                .map((level)=>level.map((row)=>row.join('')).join('\n'))
                .join('\n\n')
                : "No data available."}
            </div>
            <div>
              { B ? B
                .slice(Math.floor(A.length/2))
                .map((level)=>level.map((row)=>row.join('')).join('\n'))
                .join('\n\n')
                : "No data available."}
            </div>
            <div>
              { C ? C
                .slice(Math.floor(A.length/2))
                .map((level)=>level.map((row)=>row.join('')).join('\n'))
                .join('\n\n')
                : "No data available."}
            </div>

            <div>
              { A ? A.slice(0,Math.floor(A.length/2))
                .map((level)=>level.map((row)=>row.join('')).join('\n'))
                .join('\n\n')
                : "No data available."}
            </div>
            <div>
              { B ? B.slice(0,Math.floor(A.length/2))
                .map((level)=>level.map((row)=>row.join('')).join('\n'))
                .join('\n\n')
                : "No data available."}
            </div>
            <div>
              { C ? C.slice(0,Math.floor(A.length/2))
                .map((level)=>level.map((row)=>row.join('')).join('\n'))
                .join('\n\n')
                : "No data available."}
            </div> */}
          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2313
