import { useState } from "react"
import TableGrades from "../grades/Table"
import GradesSearcher from "../GradesSearcher"

interface ISecundaryGrades {
  setOpenModal: Function
  setCodeToModal: Function
}

const SecundaryGrades = ({ setOpenModal, setCodeToModal }: ISecundaryGrades) => {
  const [dataTable, setDataTable] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <GradesSearcher setDataTable={setDataTable} setIsLoading={setIsLoading} />
      {
        isLoading
          ? <p className="text-sm font-medium text-white-sesqui px-6 py-4 text-left">Loading ...</p>
          : <TableGrades content={dataTable} setOpenModal={setOpenModal} setCodeToModal={setCodeToModal} />
      }
    </>
  )
}

export default SecundaryGrades