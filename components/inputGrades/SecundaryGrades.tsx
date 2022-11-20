import { useState } from "react"
import TableGrades from "../grades/Table"
import GradesSearcher from "../GradesSearcher"

interface ISecundaryGrades {
  setOpenModal: Function
  setCodeToModal: Function
}

const SecundaryGrades = ({ setOpenModal, setCodeToModal }: ISecundaryGrades) => {
  const [dataTable, setDataTable] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <GradesSearcher setDataTable={setDataTable} setIsLoading={setIsLoading} />
      <TableGrades content={dataTable} setOpenModal={setOpenModal} setCodeToModal={setCodeToModal} />
    </>
  )
}

export default SecundaryGrades