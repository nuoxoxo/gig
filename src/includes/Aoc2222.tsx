import { useState, useEffect } from "react"
import { LenNStrsFromLine } from "../helpers/Helpers"

const suffixes = ['in', 'alt']
const choice = suffixes[Math.floor(Math.random() * suffixes.length)]
const URL: string = "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/2222." + choice
const chrs: string[] = ['○', '▓', '▒', '#']//, 'x', '✲', '✳', '✵', '✶', '✻', '✼']
const chr: string = chrs[Math.floor(Math.random() * chrs.length)]

var Aoc2222 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [Surface, setSurface] = useState<string[]>([])
  const [SurfaceRes, setSurfaceRes] = useState<string[]>([])
  const [Command, setCommand] = useState<string>()
  const [p1, setP1] = useState<number>(0)
  const [p2, setP2] = useState<number>(0)

  const handleData = async () => {

    try {
      const resp = await fetch(URL)
      const text = await resp.text()
      // console.log(text.charCodeAt(1))
      const raws: string[] = text.split("\n")
      const idx = raws.indexOf("")

      const surf: string[] = raws.slice(0, idx)
      const cour: string = raws.slice(idx + 1)[0]
      setLines(raws)
      setSurface(surf)
      setCommand(cour)
      // Solver()
    } catch (error: any) {
      console.error("Error fetching data: ", error)
      throw error
    }
  }

  const Solver = () => {

    if (Surface === undefined || Command === undefined)
      return
    let surface:string[] = [...Surface]
    let surfaceResTemp:string[] = [...Surface]
    let W = -1
    for (let line of surface) {
      // line = line.split('').reverse().join('')
      W = Math.max(W, line.length)
    }
    let i = -1
    while (++i < surface.length) {
      // fill zero for lines that come short
      surface[i] = surface[i] + " ".repeat(W - surface[i].length)
    }
    let c = 0
    // console.log('HERE: ', surface[0])
    while (surface[0][c] !== ".") {
      // find the Start
      c += 1
    }
    let r = 0
    let dr = 0
    let dc = 1
    const R = surface.length
    const C = surface[0].length
    const regex = /(\d+)(\D?)/g
    let match

    while ((match = regex.exec(Command)) !== null) {
      let [, str, key] = match
      let val = parseInt(str)
      // console.log('v - ', val, 'k - ', key)
      i = -1
      while (++i < val) {
        let rr = r
        let cc = c
        while (1) {
          // console.log(rr, dr, R, cc, dc, C)
          rr += dr
          if (rr >= 0) {
            rr %= R
          } else {
            rr = R + rr
          }
          cc += dc
          if (cc >= 0) {
            cc %= C
          } else {
            cc = C + cc
          }
          // console.log(surface.length, rr)
          if (surface[rr][cc] !== " ") {
            break
          }
        }
        if (surface[rr][cc] === "#") {
          break
        }
        r = rr
        c = cc
      }
      if (key === "R") {
        [dr, dc] = [dc, -dr]
      } else if (key === "L") {
        [dr, dc] = [-dc, dr]
      }
    }
    let x: number
    if (dr === 0) {
      if (dc === 1) {
        x = 0
      } else {
        x = 2
      }
    } else {
      if (dc === 1) {
        x = 1
      } else {
        x = 3
      }
    }

    setP1(1000 * (r + 1) + 4 * (c + 1) + x)

    //  Part 1
    //
    //  Part 2

    c = 0
    while (surface[0][c] !== ".") {
      // find the Start
      c += 1
    }
    r = 0
    dr = 0
    dc = 1
    while ((match = regex.exec(Command)) !== null) {
      let [, str, key] = match
      let val = parseInt(str)
      i = -1
      while (++i < val) {
        let ddr = dr
        let ddc = dc
        let rr = r + dr
        let cc = c + dc

        if (surfaceResTemp[rr] !== undefined)
          surfaceResTemp[rr] = surfaceResTemp[rr].substring(0, cc) + chr + surfaceResTemp[rr].substring(cc + 1)

        // 14 wrap around cases

        /*
        0...50..100..150  
             b___e___D  .0
             |   |   |  
            a|___|...|c .50
             |   |      
        a ...|___|c     .100
         |   |   |      
        b|___|...|D     .150
         |   |
        e|___|D         .200
        */

        // Case: ba .. ab
        // upper ba...lower ab...moving left
        if (0 <= rr && rr < 50 && cc == 49 && dc == -1) {
          dc = 1
          rr = 149 - rr
          cc = 0
        }
        //  lower ab...upper ba...moving left
        if (100 <= rr && rr < 150 && cc < 0 && dc == -1) {
          //  if 100 <= rr < 150 && cc < 0 && dr == -1:
          dc = 1
          rr = 149 - rr
          cc = 50
        }
        //  Case: be ... be
        //  upper be...lower be...moving on Up
        if (rr < 0 && 50 <= cc && cc < 100 && dr == -1) {
          dr = 0
          dc = 1
          rr = cc + 100
          cc = 0
        }
        //  lower be...upper be...moving Left
        if (cc < 0 && 150 <= rr && rr < 200 && dc == -1) {
          dr = 1
          dc = 0
          cc = rr - 100
          rr = 0
        }
        //  Case: eD ... eD
        //  upper eD...lower eD...moving Up
        if (rr < 0 && 100 <= cc && cc < 150 && dr == -1) {
          rr = 199
          cc = cc - 100
        }
        //  lower eD...upper eD...moving Down
        if (200 <= rr && 0 <= cc && cc < 50 && dr == 1) {
          rr = 0
          cc += 100
        }
        //  Case: Dc ... cD
        //  upper Dc...lower cD...moving Right (dc is 1 to be flipped)
        if (cc >= 150 && 0 <= rr && rr < 50 && dc == 1) {
          dc = -1
          rr = 149 - rr
          cc = 99
        }
        //  lower cD...upper Dc...moving right (dc 1 to -1)
        if (cc == 100 && 100 <= rr && rr < 150 && dc == 1) {
          dc = -1
          rr = 149 - rr
          cc = 149
        }
        //  Case: a...
        //  a dotted-edge 45-clockwise . moving Up
        if (0 <= cc && cc < 50 && rr == 99 && dr == -1) {
          dr = 0
          //  dc = -1
          dc = 1
          rr = cc + 50
          cc = 50
        }
        //  a dotted-edge 45-counterclockwise . moving left
        if (cc == 49 && 50 <= rr && rr <= 100 && dc == -1) {
          dr = 1
          dc = 0
          cc = rr - 50
          rr = 100
        }
        //  Case: D...
        //  D dotted-edge 45-clockwise . moving down
        if (rr == 150 && 50 <= cc && cc < 100 && dr == 1) {
          dr = 0
          dc = -1
          rr = cc + 100
          cc = 49
        }
        //  D dotted-edge 45-counterclockwise . moving right
        if (cc == 50 && 150 <= rr && rr < 200 && dc == 1) {
          dr = -1
          dc = 0
          cc = rr - 100
          rr = 149
        }
        //  Case: c...
        //  c dotted-edge 45-clockwise . moving down
        if (rr == 50 && 100 <= cc && cc < 150 && dr == 1) {
          dr = 0
          dc = -1
          rr = cc - 50
          cc = 99
        }
        //  c dotted-edge 45-counterclockwise . moving right
        if (50 <= rr && rr < 100 && cc == 100 && dc == 1) {
          dr = -1
          dc = 0
          cc = rr + 50
          rr = 49
        }
        if (surface[rr][cc] == "#") {
          dr = ddr
          dc = ddc
          break
        }
        r = rr
        c = cc
      }
      if (key === "R") {
        [dr, dc] = [dc, -dr]
      } else if (key === "L") {
        [dr, dc] = [-dc, dr]
      }
    }
    if (dr === 0) {
      if (dc === 1) {
        x = 0
      } else {
        x = 2
      }
    } else {
      if (dc === 1) {
        x = 1
      } else {
        x = 3
      }
    }

    setP2(1000 * (r + 1) + 4 * (c + 1) + x)
    setSurfaceRes(surfaceResTemp)
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    Solver()
  }, [Surface])

  return (
    <>
      {lines ? (
        <>
          <div className="playground">
            <div className="field res-field">
              <span>--- 2022 Day 22: Monkey Map ---</span>
              <span>Part 1: {p1 ? p1 : "(empty)"} </span>
              <span>Part 2: {p2 ? p2 : "(empty)"} </span>
            </div>
          </div>

          <div className="field data-field data-field-2222">
            { SurfaceRes ? SurfaceRes.join("\n") : "No data available." }
          </div>

          <div className="field data-field data-field-2222">
            { Surface ? Surface.join("\n") : "No data available." }
          </div>

          <div className="field data-field data-field-2222">
            { Command
              ? LenNStrsFromLine(Command, 100).join("\n")
              : "No data available."}
          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc2222
