interface ITable {
  titles: string[]
  content: string[][]
}

const Table = ({ titles, content }: ITable) => {
  return (
    <div className="flex flex-col bg-dark-sesqui rounded-lg bg-opacity-80 overflow-x-auto md:overflow-x-hidden w-full">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr className="">
                  {titles.map(title => <th scope="col" className="text-sm font-medium text-white-sesqui px-6 py-4 text-left">{title}</th>)}
                </tr>
              </thead>
              <tbody>
                {
                  content.map((row) => {
                    return (
                      <tr>
                        {row.map((data: string) => <td className="text-sm text-white-sesqui font-light px-6 py-4 whitespace-nowrap">{data}</td>)}
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

export default Table
/*     <table className="table-auto w-full overflow-x-scroll">
      <thead>
        
      </thead>
      <tbody>
        
      </tbody>
    </table> */