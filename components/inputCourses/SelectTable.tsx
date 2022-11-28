import { Checkbox } from "@material-tailwind/react"

interface ISelectTable {
  content: any
}

const SelectTable = ({ content }: ISelectTable) => {
  const titles: string[] = ["", "ASIGNATURA", "TIPOLOGÍA", "CUPOS"]

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
                        <td>
                          <Checkbox color="amber" defaultChecked />
                        </td>
                        <td
                          className="text-sm text-white-sesqui font-light px-6 py-4 whitespace-nowrap hover:border-b-2 hover:border-white-sesqui cursor-pointer"
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

export default SelectTable