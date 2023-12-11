import { useState, useEffect } from "react"
import { FetchDataWithoutTrim, /*Deepcopy2DArray*/ } from "../helpers/Helpers"

const suffixes = ['in']//, 'alt',]// 'test']
const choice = suffixes[Math.floor(Math.random() * suffixes.length)]
const URL:string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2311." + choice

var Aoc2311 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [null_lines, setNullLines] = useState<string[]>([])
  const [p1, setPart1] = useState<number>(0)
  const [p2, setPart2] = useState<number>(0)

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

    const denseChars:string[] = [ '⬤', '◯', '◌', '◉', '✳', '✴', '✵', '✶', '✷', '✸', '✹', '✺']
    const denseChar:string = denseChars[Math.floor(Math.random() * denseChars.length)]
    if (lines === undefined || lines[0] === undefined) return

    let coor: number[][] = []
    let R = lines.length, C = lines[0].length, r = -1, c 
    while (++r < R) {
      c = -1
      while (++c < C) {
        let node = lines[r][c]
        if (node == '#')
          coor.push([r, c])
      }
    }
    let EC:number[] = []
    let ER:number[] = []
    let IA:string[][] = []
    c = -1
    while (++c < C) {
      r = -1
      let temp: string[] = []
      while (++r < R) {
        temp.push(lines[r][c])
      }
      IA.push(temp)
    }
    r = -1
    while (++r < lines.length) {
      let ok = true
      for (let node of lines[r])
        if (node != '.')
          ok = false
      if (ok)
        ER.push(r)
    }
    c = -1
    while (++c < IA.length) {
      let ok = true
      for (let node of IA[c])
        if (node != '.')
          ok = false
      if (ok)
        EC.push(c)
    }
    setPart1(calc(coor, ER, EC))
    setPart2(calc(coor, ER, EC, 1e6))
    let temp_null_lines: string[] = [...lines]
    for (let ec of EC) {
      let i = -1
      while (++i < R) {
        temp_null_lines[i] = 
          temp_null_lines[i].substring(0, ec) + '|' + temp_null_lines[i].substring(ec + 1)
          temp_null_lines[i] = 
            temp_null_lines[i]
            .replace(/\./g, ' ')
            .replace(/\#/g, denseChar)
      }
    }
    for (let er of ER) {
      temp_null_lines[er] = 
        temp_null_lines[er]
        .replace(/\ /g, '─')
        .replace(/\|/g, '┼')
        .replace(/\#/g, denseChar)
    }
    setNullLines(temp_null_lines)
  }

  const calc = (coor: number[][], ER:number[], EC:number[], xp: number = 2): number => {
    // if (coor.length == 0) return 0
    let res = 0
    let i = -1
    while (++i < coor.length) {

      let [r, c] = coor[i]
      for (let node_next of coor.slice(0, i)) {

        let [next_r, next_c] = node_next
        let [s, e] = [ Math.min(r, next_r), Math.max(r, next_r) ]
        let node = s - 1
        while (++node < e) {
          if (ER.includes(node))
            res += xp - 1
        }
        res += e - s
        s = Math.min(c, next_c), e = Math.max(c, next_c)
        node = s - 1
        while (++node < e) {
          if (EC.includes(node))
            res += xp - 1
        }
        res += e - s
      }
    }
    return res
  }

  return (
    <>
      {lines ? (
        <>
          <div className="playground">
            <div className="field res-field res-field-1813">
              <span>--- 2023 Day 11: Cosmic Expansion ---</span>
              <span>Part 1: {p1 ? p1 : "(empty)"} </span>
              <span>Part 2: {p2 ? p2 : "(empty)"} </span>
            </div>
          </div>
          <div className="field data-field data-field-2310">
            { null_lines ? null_lines.join('\n') : "No data available." }
          </div>
          <br/>⬆️
          <br/><br/>
          <div className="field data-field data-field-2310">
            { lines ? lines.join('\n') : "No data available." }
          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2311
