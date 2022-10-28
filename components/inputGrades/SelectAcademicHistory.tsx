import { useState } from "react"
import { Checkbox } from "@material-tailwind/react"

interface ISelectAcademicHistory { 
  data: { carrer: string; }[] 
  historySelected: number
  setHistorySelected: Function
}

const SelectAcademicHistory = ({ data, historySelected, setHistorySelected }: ISelectAcademicHistory) => {
  

  return (
    <div className="w-full h-full grid justify-center items-center">
      {
        data.map((specs, index) => {
          return (
            <div className="flex items-center bg-indigo-sesqui h-fit p-5 rounded-lg">
              <Checkbox color="blue" checked={index === historySelected} onClick={() => setHistorySelected(index)} />
              <p className="text-white-sesqui text-3xl">{specs.carrer}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default SelectAcademicHistory