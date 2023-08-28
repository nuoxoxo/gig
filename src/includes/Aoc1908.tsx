import { useState, useEffect } from "react"
import { FetchData, /*LenNStrsFromLine, */ Deepcopy2DArray } from "../helpers/Helpers"

const URL:string = 
  "https://raw.githubusercontent.com/nuoxoxo/advent-of-code/main/_inputs_/1908.0"

const sparseChars:string[] = [':']
const sparseChar:string = sparseChars[Math.floor(Math.random() * sparseChars.length)]

const roundChars:string[] = ['o', 'O', '0', '8', '@']
const roundChar:string = roundChars[Math.floor(Math.random() * roundChars.length)]

const denseChars:string[] = ['▓']//, '@', '✲', '✳', '✴', '✵', '✶', '✷', '✸', '✹', '✺', '✻', '✼', '✽', '✾', '✿', '❀']
const denseChar:string = denseChars[Math.floor(Math.random() * denseChars.length)]

const W:number = 25
const T:number = 6

var Aoc1908 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [p1, setP1] = useState<number>(0)
  const [imgStart, setImgStart] = useState<string[][]>([])
  const [imgGoing, setImgGoing] = useState<string[][]>([])
  const [imgFinal, setImgFinal] = useState<string[][]>([])

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const Solver = () => {

    if (lines === undefined || lines[0] === undefined)
      return
    let line:string = lines[0] // input is one long string
    let img: string[][] = []
    let zero:number = 0
    let one:number = 0
    let two:number = 0
    let res:number = 0
    let i:number
    let j:number

    i = -1
    while (++i < T) {
      j = -1
      let temp: string[] = []
      while (++j < W) {
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
      // console.log(zero, one, two, res)
      if (max > zero) {
        max = zero
        res = one * two
      }
      zero = one = two = 0
    }
    setP1(res)
    setImgStart(img)
    let imgForImgFinal:string[][] = Deepcopy2DArray(img)
    let imgForImgGoing:string[][] = Deepcopy2DArray(img)

    i = -1
    while (++i < 6) {
      j = -1
      while (++j < 25) {
        img[i][j] === '0' ? imgForImgFinal[i][j] = ' ' : img[i][j] === '1' ? imgForImgFinal[i][j] = denseChar : ''
        img[i][j] === '1' ? imgForImgGoing[i][j] = sparseChar : imgForImgGoing[i][j] = roundChar
      }
    }
    setImgFinal(imgForImgFinal)
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
          <div className="playground playground-1908">
            <div className="field res-field res-field-1908" >
              <span>--- 2019 Day 8: Space Image Format ---</span>
              <span>Part 1: { p1 ? p1 : '(empty)' }</span>
              <span>Part 2: </span>
              <span className='res-field-1908-image'>
                { imgFinal.map(line => line.join('')).join('\n') }
                <br />
                <br />
                { imgGoing.map(line => line.join('')).join('\n') }
                <br />
                <br />
                { imgStart.map(line => line.join('')).join('\n') }
              </span>
            </div>
            <div className="field data-field data-field-single-line-string" >
              { lines ? lines.length === 1 
                  ? lines[0]
                  // ? LenNStrsFromLine(lines[0], 32).join("\n")
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
