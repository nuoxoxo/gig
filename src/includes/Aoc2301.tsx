import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine } from "../helpers/Helpers"

const URL:string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2301.in"

var Aoc2301 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [p1, setPart1] = useState<number>(0)
  const [p2, setPart2] = useState<number>(0)

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const Solver = () => {
    // lines.pop()
    let A: string[] = []
    let r1 = 0
    let r2 = 0
    let D: Record<string, number> = {
      "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
      "six": 6, "seven": 7, "eight": 8, "nine": 9,
      "1": 1, "2": 2, "3": 3, "4": 4, "5": 5,
      "6": 6, "7": 7, "8": 8, "9": 9
    }
    for (let s of lines) {
      A.push(s)
      let a: Array<[number, string]> = []
      let i = -1
      let L: string = ''
      let R: string = ''
      while (++i < s.length) {
        if ( ! isNaN(parseInt(s[i]))) {
          L = s[i]
          break
        }
      }
      i = s.length
      while (--i > -1) {
        if ( ! isNaN(parseInt(s[i]))) {
          R = s[i]
          break
        }
      }
      r1 += parseInt(L + R)
      for (let key of Object.keys(D)) {
        let l = s.indexOf(key)
        let r = s.lastIndexOf(key)
        if (l !== -1) {
          a.push([l, key])
        }
        if (r !== -1) {
          a.push([r, key])
        }
      }
      a.sort((x, y) => x[0] - y[0])
      let ll: string = D[a[0][1]]!.toString()
      let rr: string = D[a[a.length - 1][1]]!.toString()
      let ss: string = ll + rr
      r2 += parseInt(ss)
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
        <div className='playground playground-2003' style={{textAlign:"center"}}>
          <div className="field res-field">
            <span>--- 2O23 Day 1: Trebuchet?! ---</span>
            <span>Part 1: {p1?p1:'(no solution available)'}</span>
            <span>Part 2: {p2?p2:'(no solution available)'}</span>
          </div>

          <div className="field data-field data-field-2301" style={{fontSize:"15px"}}>
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

export default Aoc2301
