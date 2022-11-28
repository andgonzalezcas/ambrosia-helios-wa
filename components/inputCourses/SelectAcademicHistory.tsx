import { Checkbox } from "@material-tailwind/react"
import { useEffect, useState } from "react"

interface ISelectAcademicHistory {
  data: any
  historySelected: string
  setHistorySelected: Function
}

const SelectAcademicHistory = ({ data, historySelected, setHistorySelected }: ISelectAcademicHistory) => {
  const [items, setItems] = useState([])

  const getItems = () => {
    const arrayObject: any = []
    Object.entries(data).forEach(([key, value]: any) => {
      arrayObject.push(
        <div key={key} className="flex items-center bg-indigo-sesqui h-fit p-5 rounded-lg">
          <Checkbox color="blue" checked={key == historySelected} onChange={() => setHistorySelected(key)} />
          <p className="text-white-sesqui text-3xl">{value}</p>
        </div>
      )
    })
    setItems(arrayObject)
  }

  useEffect(() => {
    if (!data) return
    getItems()
  }, [data, historySelected])

  return (
    <div className="w-full h-full grid justify-center items-center">
      {
        items.map(item => item)
      }
    </div>
  )
}

export default SelectAcademicHistory