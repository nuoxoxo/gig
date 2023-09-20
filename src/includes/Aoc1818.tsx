import { useState, useEffect } from "react"
import { FetchData, Deepcopy2DArray } from "../helpers/Helpers"

const suffixes = ['in', 'alt']
const choice = suffixes[Math.floor(Math.random() * suffixes.length)]
const URL:string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/1818." + choice

var Aoc1818 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [p1, p1setter] = useState<number>(0)
  const [p2, p2setter] = useState<number>(0)
  const [image1, setImage1] = useState<string[][]>([])
  const [image2, setImage2] = useState<string[][]>([])

  const handleData = async () => {

    try {
      const raws = await FetchData(URL)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const Solver = (limit: number, lines: string[]): [number, string[][]] /*| undefined*/ => {

    if (lines === undefined || lines[0] === undefined)
      return [0, [['']]]
      //throw new Error("something is very wrong")
    let res:number = 0
    let g:string[][] = []
    for (let line of lines) {
        let temp:string[] = []
        for (let c of line) {
            temp.push(c)
        }
        g.push(temp)
    }
    let R:number = g.length
    let C:number = g[0].length
    let D:Record<string, number> = {}

    let ll = -1
    let r, c
    while (++ll < limit) {
        // console.log(ll)
        let temp:string[][] = []
        r = -1
        while (++r < R) {
            let tmp:string[] = []
            c = -1
            while (++c < C) {
                tmp.push(' ')
            }
            temp.push(tmp)
        }
        r = -1
        while (++r < R) {
            c = -1
            while (++c < C) {
                let [T, L] = [0, 0]
                let dr = -2
                while (++dr < 2) {
                    let dc = -2
                    while (++dc < 2) {
                        if (dr === 0 && dc === 0)
                            continue
                        let rr = r + dr
                        let cc = c + dc
                        if (rr < 0 || rr > R - 1 || cc < 0 || cc > C - 1)
                            continue
                        if (g[rr][cc] === '|') {
                            ++T
                        } else if (g[rr][cc] === '#') {
                            ++L
                        }
                    }
                }
                if (g[r][c] === '.') {
                    temp[r][c] = T > 2 ? '|' : '.'
                } else if (g[r][c] === '|') {
                    temp[r][c] = L < 3 ? '|' : '#'
                } else {
                    temp[r][c] = T > 0 && L > 0 ? '#' : '.'
                }
            }
        }
        g = Deepcopy2DArray(temp)
        let key:string = g.map(line => line.join('')).join('')
        if (D.hasOwnProperty(key)) {
            ll += Math.floor((limit - ll) / (ll - D[key])) * (ll - D[key])
            if (ll > limit -1)
                break
        } else {
            D[key] = ll
        }
        let [T, L] = [0, 0]
        r = -1
        while (++r < R) {
            c = -1
            while (++c < C) {
                if (g[r][c] === '|') {
                    ++T
                } else if (g[r][c] === '#') {
                    ++L
                }
            }
        }
        res = L * T
    }
    return [ res, g ]
  }

  const Setter = () => {
    let res1 = Solver(10, lines)
    p1setter(res1![0])
    setImage1(res1![1])
    let res2 = Solver(Math.floor(1e9), lines)
    p2setter(res2![0])
    setImage2(res2![1])
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    Setter()
  }, [lines])

  return (
    <>
      {lines ? (
        <>
          <div className="playground">
            <div className="field res-field res-field-1818">
              <span>--- 1818 Day 18: Settlers of The North Pole ---</span>
              <span>Part 1: {p1 ? p1 : "(empty)"} </span>
              <span>Part 2: {p2 ? p2 : "(empty)"} </span>
              <div className="field data-field data-field-1818">
                { image2 ? image2.join("\n") : "No data available." }
              </div>
              <div className="field data-field data-field-1818">
                { image1 ? image1.join("\n") : "No data available." }
              </div>
            </div>
          </div>

          <div className="field data-field res-field-1818">
            { lines ? lines.join("\n") : "No data available." }
          </div>

        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc1818
