import { useState, useEffect } from "react"
import { FetchDataWithoutTrim, /*Deepcopy2DArray*/ } from "../helpers/Helpers"

const suffixes = ['in', 'alt',]// 'test']
const choice = suffixes[Math.floor(Math.random() * suffixes.length)]
const URL:string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2314." + choice

var Aoc2314 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [arrTransposedCounterClockwise90, setArrTransposedCounterClockwise90] = useState<string[][]>([])
  const [arrRolledLeft, setArrRolledLeft] = useState<string[][]>([])
  const [arrTransposedClockwise90, setArrTransposedClockwise90] = useState<string[][]>([])
  const [arrTransposedClockwise90_right, setArrTransposedClockwise90_Right] = useState<string[][]>([])
  const [arrTransposedClockwise90_right_again, setArrTransposedClockwise90_Right_Again] = useState<string[][]>([])
  const [p1, /*setPart1*/] = useState<number>(0)
  const [p2, /*setPart2*/] = useState<number>(0)

  const handleData = async () => {

    try {
      const raws = await FetchDataWithoutTrim(URL)
      if ( ! raws[raws.length - 1].length)
        raws.pop()
      setLines(raws)
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

  const Solver = () => {

    let transposed = CounterClockwise90(lines.map((line)=>line.split('')))
    setArrTransposedCounterClockwise90(transposed)

    let rolled = RollingLeft(transposed)
    setArrRolledLeft(rolled)

    let transposed_back = Clockwise90(rolled)
    setArrTransposedClockwise90(transposed_back)

    let transposed_right = Clockwise90(transposed_back)
    setArrTransposedClockwise90_Right(transposed_right)

    let transposed_right_again = Clockwise90(transposed_right)
    setArrTransposedClockwise90_Right_Again(transposed_right_again)

  }

  const CounterClockwise90 = (A: string[][]): string[][] => {
    if (!A || !A[0])
      return []
    let arr: string[][] = A.map((r) => r)
    return arr[0].map((_, i) => arr.map(row => row[arr.length - i - 1]))
  }

  const Clockwise90 = (A: string[][]): string[][] => {
    if (!A || !A[0])
      return []
    let arr: string[][] = A.map((r) => r)
    return arr[0].map((_, col) => arr.map(row => row[col]).reverse())
  }

  const RollingLeft = (A: string[][]): string[][] => {

    let arr: string[][] = A.map((r) => r)
    const nomove: number[][] = Array.from({ length: arr.length }, () => [])    
    let i = -1
    while (++i < arr.length) {

      const a = arr[i]
        if ( ! a.includes('#'))
            continue
        let index = -1
        while (++index < a.length) {
            let char = a[index]
            if (char === '#') {
                nomove[i].push(index)
            }
        }
    }
    i = -1
    while (++i < nomove.length) {

      const allpos = nomove[i]
        if (allpos.length === 0) {
          arr[i] = arr[i].sort().reverse()
            continue
        }
        let prev = -1
        for (const pos of allpos) {
          arr[i] = [
            ...arr[i].slice(0, prev + 1), 
            ...arr[i].slice(prev + 1, pos).sort().reverse(), 
            ...arr[i].slice(pos)
          ]
          prev = pos
        }
        if (prev !== -1) {
          arr[i] = [...arr[i].slice(0, prev + 1), ...arr[i].slice(prev + 1).sort().reverse()]
        }
    }

    return arr
}

  return (
    <>
      {lines ? (
        <>
          <div className="playground">
            <div className="field res-field res-field-2313">
              <span>--- 2023 Day 14: Parabolic Reflector Dish ---</span>
              <span>Part 1: {p1 ? p1 : "(not planned)"} </span>
              <span>Part 2: {p2 ? p2 : "(not planned)"} </span>
            </div>
          </div>
          <div className="field data-field data-field-2314">
            <div style={{fontSize:'21px'}}>
              Demo: How all sand sink to the bottom?
            </div>
            <div>
              {
                arrTransposedClockwise90_right_again ? 
                arrTransposedClockwise90_right_again
                  .map((arr) => arr.join(''))
                  .map((s) => s.replace(/\./g,' '))
                  .map((s) => s.replace(/O/g, ':'))
                  .map((s) => s.replace(/#/g, '─'))
                  .join('\n') : "No data available."
                  
              }
            </div>
            <div style={{fontSize:'21px'}}>👇 Input</div>
            <div>
              {
                lines ? lines
                  .map((s) => s.replace(/\./g,' '))
                  .map((s) => s.replace(/\O/g,'O'))
                  .join('\n') : "No data available."
              }
            </div>
            <div style={{fontSize:'21px'}}>👇 Transposed 90 degrees counter-clockwise</div>
            <div>
              {
                arrRolledLeft ? 
                arrTransposedCounterClockwise90
                  .map((arr) => arr.join(''))
                  .map((s) => s.replace(/\./g,' '))
                  .join('\n') : "No data available."
              }
            </div>
            <div style={{fontSize:'21px'}}>👇 Rolled Left </div>
            <div>
              {
                arrRolledLeft ? 
                arrRolledLeft
                  .map((arr) => arr.join(''))
                  .map((s) => s.replace(/\./g,' '))
                  .join('\n') : "No data available."
              }
            </div>
            <div style={{fontSize:'21px'}}>👇 Turn it back : Transposed 90 degrees clockwise </div>
            <div>
              {
                arrTransposedClockwise90 ? 
                arrTransposedClockwise90
                  .map((arr) => arr.join(''))
                  .map((s) => s.replace(/\./g,' '))
                  .join('\n') : "No data available."
              }
            </div>
            <div style={{fontSize:'21px'}}>👇 Further transposed </div>
            <div>
              {
                arrTransposedClockwise90_right ? 
                arrTransposedClockwise90_right
                  .map((arr) => arr.join(''))
                  .map((s) => s.replace(/\./g,' '))
                  .join('\n') : "No data available."
              }
            </div>
            <div style={{fontSize:'21px'}}>👇 All sand sink to the bottom</div>
            <div>
              {
                arrTransposedClockwise90_right_again ? 
                arrTransposedClockwise90_right_again
                  .map((arr) => arr.join(''))
                  .map((s) => s.replace(/\./g,' '))
                  .map((s) => s.replace(/O/g, '.'))
                  .join('\n') : "No data available."
              }
            </div>
          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2314
