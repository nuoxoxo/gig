import { useState, useEffect } from "react"
import { FetchData, LenNStrsFromLine, deepcopy_2d_array } from "../helpers/Helpers"

const path = 
  "https://raw.githubusercontent.com/nuoxoxo/advent-of-code/main/_inputs_/1908.0"

var Aoc1908 = () => {
  const [lines, setLines] = useState<string[]>([])
  const [p1, setP1] = useState<number>(0)
  const [imgStart, setImgStart] = useState<string[][]>([])
  const [imgGoing, setImgGoing] = useState<string[][]>([])
  const [imgFinal, setImgFinal] = useState<string[][]>([])
  // const [p2, setP2] = useState<number>(0)

  const handleData = async () => {
    try {
      const raws = await FetchData(path)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }


  //  What's wrong with this arrow function

  // const deepcopy_2d_array = <T>(arr: T[][]): T[][] => {
  //   let res: T[][] = []
  //   for (const row of arr) {
  //     const temp: T[] = []
  //     for (const c of row) {
  //       temp.push(c)
  //     }
  //     res.push(temp)
  //   }
  //   return res
  // }

  const Solver = () => {
    if (lines === undefined || lines[0] === undefined)
      return
    let line = lines[0] // input is one long string
    let img: string[][] = []
    let zero:number = 0
    let one:number = 0
    let two:number = 0
    let res:number = 0
    let i:number
    let j: number

    i = -1
    while (++i < 6) {
      j = -1
      let temp: string[] = []
      while (++j < 25) {
        temp.push('2')
      }
      img.push(temp)
    }

    let max:number = Number.MAX_SAFE_INTEGER
    let index:number = 0
    while (index < line.length) {
      
      i = -1
      while (++i < 6) {
        j = -1
        while (++j < 25) {
          let c:string = line[ index ]
          if (c === '0') {
            ++zero
          } else if (c === '1') {
            ++one
          } else if (c === '2') {
            ++two
          }
          ++index
          if (img[i][j] === '2') {
            img[i][j] = c
          }
        }
      }
      console.log(zero, one, two, res)
      if (max > zero) {
        max = zero
        res = one * two
      }
      zero = one = two = 0
    }
    setP1(res)
    setImgStart(img)
    let imgForImgStart:string[][] = deepcopy_2d_array(img)
    let imgForImgGoing:string[][] = deepcopy_2d_array(img)

    i = -1
    while (++i < 6) {
      j = -1
      while (++j < 25) {
        img[i][j] === '0' ? imgForImgStart[i][j] = ' ' : img[i][j] === '1' ? imgForImgStart[i][j] = '$' : ''
        img[i][j] === '1' ? imgForImgGoing[i][j] = '.' : imgForImgGoing[i][j] = img[i][j]
      }
    }
    setImgFinal(imgForImgStart)
    setImgGoing(imgForImgGoing)
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
        <>
          <div className="playground">
            <div className="field res-field res-field-1908" >
              <span>--- 2019 Day 8: Space Image Format ---</span>
              <span>Part 1: { p1 }</span>
              <span>Part 2: </span>
              <span className='res-field-1908-image'>
                { imgFinal.map(line => line.join('')).join('\n') }
                <br /><br />
                { imgGoing.map(line => line.join('')).join('\n') }
                <br /><br />
                { imgStart.map(line => line.join('')).join('\n') }
              </span>
            </div>
            <div className="field data-field">
              { lines ? lines.length === 1 
                  ? LenNStrsFromLine(lines[0], 42).join("\n")
                  : lines.join("\n")
                : "No data available."
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

export default Aoc1908
