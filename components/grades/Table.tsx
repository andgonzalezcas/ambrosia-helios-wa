interface ITable {
  content: any,
  setOpenModal: Function
  setCodeToModal: Function
  
}

const TableGrades = ({ content, setOpenModal, setCodeToModal }: ITable) => {
  const titles: string[] = ["ASIGNATURA", "TIPOLOGÍA"]

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
                  content.map((row: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td
                          className="text-sm text-white-sesqui font-light px-6 py-4 whitespace-nowrap hover:border-b-2 hover:border-white-sesqui cursor-pointer"
                          onClick={() => {
                            setCodeToModal(row.code)
                            setOpenModal(true)
                          }}
                        >{`${row.name} (${row.code})`}</td>
                        <td className="text-sm text-white-sesqui font-light px-6 py-4 whitespace-nowrap">{row.component}</td>
                      </tr>
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

export default TableGrades