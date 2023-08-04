import { useState, useEffect } from 'react'
import { FetchData } from './FetchData'

const path = 
  'https://raw.githubusercontent.com/nuoxoxo/in/main/1802.in'

const special2 = '🔵'
const special3 = '🟠'

var Route1802 = () => {

  const [ loading, setLoading ] = useState<boolean>( true )
  const [ lines, setLines ] = useState<string[]>( [] )
  const [ lines23, setLines23 ] = useState<string[]>( [] )
  const [ p1, setP1 ] = useState<number>( 0 )
  const [ p2, setP2 ] = useState<string>( '' )

  const Solver_Part_One = () => {

    let c2: number = 0
    let c3: number = 0
    let tempLines23: string[] = []
    for (const line of lines) {
      // console.log(line)
      let D: number[] = new Array(26).fill(0)
      for (const c of line) {
        D[c.charCodeAt(0) - 'a'.charCodeAt(0)]++
      }
      let ok2: boolean = false
      let ok3: boolean = false
      let char2: string = ''
      let char3: string = ''
      let strToPush: string = line
      let i: number = -1
      while (++i < D.length) {
        if (D[i] === 2) {
          ok2 = true
          char2 = String.fromCharCode(i + 'a'.charCodeAt(0))
        }
        if (D[i] === 3) {
          ok3 = true
          char3 = String.fromCharCode(i + 'a'.charCodeAt(0))
        }
      }
      if (ok2) {
        c2++
        strToPush = strToPush.replace(new RegExp(char2, 'gi'), special2)
      }
      if (ok3) {
        c3++
        strToPush = strToPush.replace(new RegExp(char3, 'gi'), special3)
      }
      if (strToPush.length !== 0) {
        tempLines23.push(strToPush)
      }
    }
    setLines23(tempLines23)
    setP1(c2 * c3)
  }

  const Solver_Part_Two = () => {

    let i: number = -1
    let len: number = lines.length > 0 ? lines[0].length : 0
    let res2: string = ''
    while (++i < len)
    {
      let j: number = -1
      while (++j < lines.length) {
        let L: string = lines[j].substr(0, i) + lines[j].substr(i + 1, len - 1 - i)
        let k: number = -1
        while (++k < lines.length) {
          if (j === k) {
            continue
          }
          let R: string = lines[k].substr(0, i) + lines[k].substr(i + 1, len - 1 - i)
          if (L === R) {
            res2 = L
            break
          }
        }

      }
    }
    setP2(res2)
  }

  const handleData = async () => {
    try {
      const raws = await FetchData( path )
      setLines(raws)
      setLoading(false)
    } catch (error: any) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  }

  useEffect( () => {
    handleData()
  }, [])

  useEffect( () => {
    Solver_Part_One()
  }, [lines])

  useEffect( () => {
    Solver_Part_Two()
  }, [lines])

  return (
    <>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className='container-L'>
          <pre style={{ fontSize: '16px' }}>
            { lines ? lines.join('\n') : 'No data available.' }
          </pre>
          <pre style={{ fontSize: '16px' }}>
            { lines23 ? lines23.join('\n') : 'No data available.' }
          </pre>
          <div className='container-R'>
            <span>--- 2018 Day 2: Inventory Management System ---</span>
            <span>Part 1: <br />{ p1 }</span>
            <span>Part 2: <br />{ p2 }</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Route1802
