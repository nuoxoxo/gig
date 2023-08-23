export const FetchData = async ( path: string ): Promise<string[]> => {

  try {
    const resp = await fetch( path )
    const text = await resp.text()
    const raws: string[] = text.trim().split('\n')
    return raws
  } catch (error: any) {
    console.error("Error fetching data: ", error)
    throw error
  }
}

// export function Rotate2DArrayLeft90Deg<T>(originalArray: T[][]): T[][] {
//   const arr = Deepcopy2DArray(originalArray)

// }

export function Deepcopy2DArray<T>(arr: T[][]): T[][] {
  const res: T[][] = []
  for (const row of arr) {
    const temp: T[] = []
    for (const c of row) {
      temp.push(c)
    }
    res.push(temp)
  }
  return res 
}

//  What's wrong with this arrow function

// export const Deepcopy2DArray = <T>(arr: T[][]): T[][] => {
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

export const GetRandomHexColorCode = () => {

  const chars: string = '0123456789ABCDEF'
  let hex: string = '#'
  let i: number = -1
  while (++i < 6) {
    hex += chars[Math.floor(Math.random() * 16)];
  }
  return hex;
}

export const LenNStrsFromLine = (s: string, n: number): string[] => {

  let res: string[] = []
  let i: number = 0
  while (i < s.length) {
    let len: number = (s.length - i + 1) < n ? s.length - i + 1 : n
    res.push(s.substring(i, i + len))
    i += n
    // console.log(i, res[res.length - 1])
  }
  return res
}
