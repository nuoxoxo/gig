import { useState, useEffect } from 'react'
import { FetchData, LenNStrsFromLine } from '../helpers/Helpers'

const URL:string = 
  'https://raw.githubusercontent.com/nuoxoxo/in/main/aoc/1501.in'

const santaArray: string[] = 
  ['🎅🏻', '🧑🏻‍🎄', '🤶🏻', '🦌', '🛷', '🎄', 
    '🔔', '🧦', '🎁', '🎄', '🌲', '❄️']
const santaString: string =
  santaArray[Math.floor(Math.random() * santaArray.length)]

var Aoc1501 = () => {
  const [lines, setLines] = useState<string[]>([])
  const [floors, setFloors] = useState<number[]>([])
  const [upDown, setUpDown] = useState<string[]>([])
  const [p1, setP1] = useState<number>(0)
  const [p2, setP2] = useState<number>(0)

  const handleData = async () => {
    try {
      const raws = await FetchData(URL)
      setLines(raws)
    } catch (error: any) {
      console.error('Error fetching data: ', error)
    }
  }

  const Solver = () => {
    if (lines === undefined || lines[0] === undefined) return
    let s: string = lines[0]
    let res1: number = 0
    let res2: number = 0

    let process: string[] = []
    let saveCurrentFloors: number[] = []
    let prev: string = s[0]
    let basement: boolean = false
    let basementChecked: boolean = false
    let i: number = -1

    while (++i < s.length) {
      let c: string = s[i]
      let temp: string = ''
      if (c == '(') {
        ++res1
      } else {
        --res1
      }
      saveCurrentFloors.push(res1)
      let symbol = ' '
      if (prev !== c) {
        if (prev === '(') {
          symbol = '↗'
        } else if (prev === ')') {
          symbol = '↘'
        } else {
          symbol = '-'
        }
      }
      if (!basement && res1 < 0) {
        res2 = i + 1
        basement = true
      }
      temp = symbol + ' ' + (res1 < 0 ? '' : ' ') + res1.toString()
      if (!basementChecked && basement) {
        temp += ' ☆'
        basementChecked = true
      }
      process.push(temp)
      // console.log(temp)
      prev = c
    }
    setFloors(saveCurrentFloors)
    setUpDown(process)
    setP1(res1)
    setP2(res2)
  }

  const computeFloors = () => {
    let low: number = Math.min(...floors)
    let width = Math.max(...floors) - low
    let res: string[] = []
    let char: string = '.'
    for (let n of floors) {
      let temp: string = char.repeat(21)
      let dist: number = Math.floor(((n - low) / width) * temp.length)
      temp = temp.substring(0, dist) + santaString // + '|' + temp.substring(dist)
      // console.log(temp.length)
      res.push(temp)
    }
    // console.log(Math.min(...floors), Math.max(...floors))
    return res.filter((item, pos, arr) => pos === 0 || item !== arr[pos - 1])
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
        <div className='playground'>
          <div className='field data-field data-field-1501-santa'>
            { lines
              ? lines.length === 1
                // lines[0]
                ? LenNStrsFromLine(lines[0], 16).join('\n')
                : lines.join('\n')
              : 'No data available.'}
          </div>
          <div className='field data-field'>
            {upDown ? [...upDown].reverse().join('\n') : 'No data available.'}
          </div>
          <div className='field res-field'>
            <span>--- 2015 Day 1: Not Quite Lisp ---</span>
            <span>Part 1: {p1?p1:'(empty)'}</span>
            <span>Part 2: {p2?p2:'(empty)'}</span>
            {/* <div className='field data-field data-field-1501-santa'> */}
            <div>
              {lines ? computeFloors().join('\n') : 'No data available.'}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Aoc1501
