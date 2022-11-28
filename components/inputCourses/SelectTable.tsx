import { Checkbox } from "@material-tailwind/react"
import { useEffect, useState } from "react"

const GroupsRows = ({ groups, selectedCourses, setSelectedCourses }: any) => {
  const [rowsElements, setRowElements] = useState([])
  const [rowsIds, setRowsIds] = useState([])
  const [change, setChange] = useState(false)

  useEffect(() => {
    const ids: any = []
    const auxrows: any = []
    let auxArray = selectedCourses
    groups.map((group: any, index: number) => {
      ids.push(group.code)
      auxrows.push(
        <tr key={index} className='bg-black bg-opacity-30'>
          <td>
            <Checkbox
              color="amber"
              onChange={() => {
                ids.map((id: any) => {
                  auxArray = selectedCourses.filter((item: any) => item != id)
                  setSelectedCourses(auxArray)
                })
                if (selectedCourses.indexOf(group.code) == -1) {
                  auxArray.push(group.code)
                  setSelectedCourses(auxArray)
                }
                setChange(!change)
              }}
              checked={selectedCourses.indexOf(group.code) !== -1}
            />
          </td>
          <td className="text-sm text-white-sesqui font-light px-6 py-2 whitespace-nowrap">{`Grupo: ${group.code}`}</td>
        </tr>
      )

    })

    if (auxrows.length == 0) {
      auxrows.push(
        <tr className='bg-black bg-opacity-30'>
          <td colSpan={2} className='text-sm text-white-sesqui font-light px-6 py-2 whitespace-nowrap'>{`No hay cupos!`}</td>
        </tr>
      )
    }

    setRowElements(auxrows)
    setRowsIds(ids)
  }, [groups, selectedCourses, change])

  return (<>{rowsElements.map(group => group)}</>)
}

interface ISelectTable {
  content: any
  selectedCourses: any
  setSelectedCourses: Function
}

const SelectTable = ({ content, selectedCourses, setSelectedCourses }: ISelectTable) => {
  const titles: string[] = ["X", "ASIGNATURA"]
  const [contentMap, setContentMap] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setContentMap(content)
    }, 1000)
  }, [content])

  return (
    <div className="flex flex-col bg-dark-sesqui rounded-lg bg-opacity-80 overflow-x-auto md:overflow-x-hidden w-full">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr className="">
                  {titles.map((title, index) => <th key={index} scope="col" className="text-sm font-medium text-white-sesqui px-6 py-4 text-left">{title}</th>)}
                </tr>
              </thead>
              <tbody>
                {
                  contentMap.map((row: any, index: number) => {
                    return (
                      <>
                        <tr key={index}>
                          <td></td>
                          <td
                            className="text-sm text-white-sesqui font-light px-6 py-4 whitespace-nowrap hover:border-b-2 hover:border-white-sesqui cursor-pointer"
                          >{`${row.name} (${row.code})`}</td>
                        </tr>
                        <GroupsRows groups={row.groups} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} />
                      </>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  )
}

export default SelectTable