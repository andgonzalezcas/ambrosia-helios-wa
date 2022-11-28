import { useState } from "react"
import GradesSearcher from "../GradesSearcher"
import SelectTable from "./SelectTable"

interface ISecundaryGrades {
  selectedCourses: any
  setSelectedCourses: Function
}

const SecundaryGrades = ({ selectedCourses, setSelectedCourses }: ISecundaryGrades) => {
  const [dataTable, setDataTable] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useState

  return (
    <>
      <GradesSearcher setDataTable={setDataTable} setIsLoading={setIsLoading} />
      {
        isLoading
          ? <p className="text-sm font-medium text-white-sesqui px-6 py-4 text-left">Loading ...</p>
          : <SelectTable content={dataTable} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} />
      }
    </>
  )
}

export default SecundaryGrades