import { useState, useEffect } from "react"
import { FetchData } from "../helpers/Helpers"

const suffixes = ['alt', '0']
const choice = suffixes[Math.floor(Math.random() * suffixes.length)]

const URL: string =
  "https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/1810." + choice

// console.log(choice, URL)

var Aoc1810 = () => {

  const [lines, setLines] = useState<string[]>([])
  const [images, setImages] = useState<string[][]>([])

  const chrs: string[] = ['█', '▓', '▒', '#' /*, '○'*/]//, 'x', '✲', '✳', '✵', '✶', '✻', '✼']
  const chr: string = chrs[Math.floor(Math.random() * chrs.length)]

  const sps: string[] = ['.'/*, ' '*/]//, 'x', '✲', '✳', '✵', '✶', '✻', '✼']
  const sp: string = sps[Math.floor(Math.random() * sps.length)]

  const handleData = async () => {

    try {
      const raws = await FetchData(URL)
      setLines(raws)
    } catch (error: any) {
      console.error("Error fetching data: ", error)
    }
  }

  const Solver = () => {

    let res:string[][] = []
    let A: number[][] = []
    for (let line of lines) {
      let [x, y, dx, dy] = line.match(/-?\d+/g)!.map(Number)
      A.push([x, y, dx, dy])
    }

    console.log(A)

    let i = -1
    while (++i < 10700) { // range is hand picked

      let hix: number = Math.max(...A.map(([n, , ,]) => n))
      let lox: number = Math.min(...A.map(([n, , ,]) => n))
      let hiy: number = Math.max(...A.map(([, n, ,]) => n))
      let loy: number = Math.min(...A.map(([, n, ,]) => n))
      let offset = 100

      if (lox + offset > hix && loy + offset > hiy) {
        let temp:string[] = ['\n --- Step no. ' + i.toString() + ' --- \n']
        // console.log(i)

        let r = loy - 1
        // let s = '' // Bug 
        while (++r < hiy + 1) {
          let c = lox - 1
          let s = ''
          while (++c < hix + 1) {
            const temp = A.map(([x, y, ,]) => [x, y])
            if (temp.some(([x, y]) => x === c && y === r)) {
              s += chr
            } else {
              s += sp
            }
          }
          // s += '\n'
          temp.push(s)
        }
        // console.log(s)
        res.push(temp)
      }
      let j = -1
      while (++j < A.length) {
        A[j][0] += A[j][2]
        A[j][1] += A[j][3]
      }
    }
    setImages(res)
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
        <>

          <div className="playground">
            <div className="field res-field res-field-1810">
              <span>--- 2018 Day 10: The Stars Align ---</span>
              {/* <span>Part 1: {p1 ? p1 : "(empty)"} </span> */}
              {/* <span>Part 2: {p2 ? p2 : "(empty)"} </span> */}
              <div className='res-field-1810-image'>
                {images ? images.map(line => line.join('\n')).join('\n') : "No data available."}
              </div>
            </div>
          </div>

        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc1810
