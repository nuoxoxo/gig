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
