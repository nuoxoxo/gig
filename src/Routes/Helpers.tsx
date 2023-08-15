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

export const GetRandomColor = () => {
  const chars: string = '0123456789ABCDEF'
  let hex: string = '#'
  let i: number = -1
  while (++i < 6) {
    hex += chars[Math.floor(Math.random() * 16)];
  }
  return hex;
}
