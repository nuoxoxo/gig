import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const URL:string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2302.in"

var Aoc2302 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [p1, setPart1] = useState<number>(0)
  const [p2, setPart2] = useState<number>(0)

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      // raws.map((line) => "⭐" + line.substring(4)) // map method does not edit original array
      for (let i = 0; i < raws.length; i++) {
        raws[i] = "⭐" + raws[i].substring(4)
      }
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const Solver = () => {
    let D: {[key: string]: number} = {'red': 12, 'green': 13, 'blue': 14}
    lines.pop()
    let r1 = 0
    let r2 = 0
    let idx = 1
    for (let line of lines) {
      // console.log(line)
      line = line.trim()
      let s: string[] = line.split(':')[1].split(' ')
      s.shift()
      let ok = true
      let i = 0
      while (i < s.length - 1) {
          let w = s[i + 1]
          if (w[w.length-1] === ',' || w[w.length-1] === ';')
              w = w.slice(0, -1)
          let v = parseInt(s[i])
          if (D[w] < v)
              ok = false
          i += 2
      }
      if (ok)
          r1 += idx
      // part 2
      let [R, B, G] = [0, 0, 0]
      let rr: string[] = line.split(':')[1].split(';')
      for (let el of rr) {
          let e: string[] = el.split(' ')
          e.shift()
          i = 0
          while (i < e.length - 1) {
              let v = parseInt(e[i])
              let k = e[i + 1]
              if (k.includes('red'))
                  R = Math.max(R, v)
              if (k.includes('blue'))
                  B = Math.max(B, v)
              if (k.includes('green'))
                  G = Math.max(G, v)
              i += 2
          }
      }
      idx++
      r2 += R * B * G
    }
    setPart1(r1)
    setPart2(r2)
    // console.log("part 1:", r1)
    // console.log("part 2:", r2)
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    Solver()
  }, [lines])

  return (
    <>
      {lines ? (
        <div className='playground playground-2003' style={{textAlign:'center'}}>
          <div className="field res-field">
            <span>--- 2O23 Day 2: Cube Conundrum ---</span>
            <span>Part 1: {p1?p1:'(no solution available)'}</span>
            <span>Part 2: {p2?p2:'(no solution available)'}</span>
          </div>

          <div className="field data-field data-field-2301" style={{fontSize:'11px',textAlign:'left'}}>
            {lines
              ? lines.length === 1
                ? LenNStrsFromLine(lines[0], 16).join("\n")
                : lines.join("\n")
              : "No data available."}
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2302
