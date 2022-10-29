import { useState } from "react";
import { Select, Option, Input, Button } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import Table from "../components/Table";
import GradesSearcher from "../components/GradesSearcher";

const dataTable = {
  titles: [
    "ASIGNATURA", "TIPOLOGÍA", 'CRÉDITOS', 'CUPOS DISPONIBLES'
  ],
  content: [
    [
      'Introducción a las ciencias de la computación y a la programación (202654)',
      'Diciplinar Optativa',
      '3',
      '24'
    ],
    [
      'Computación paralela y distribuida (2016722)',
      'Disciplinar Obligatoria',
      '3',
      '12'
    ],
    [
      'Taller de proyector interdiciplinarios (2024045)',
      'Disciplinar Obligatoria',
      '4',
      '0'
    ],
    [
      'Computación visual (2025960)',
      'Disciplinar Obligatoria',
      '3',
      '5'
    ]
  ]
}

const tabs: any = [
  {
    id: 1,
    icon: '📖',
    label: 'Asignaturas disponibles para cursar',
  },
  {
    id: 2,
    icon: '🌐',
    label: 'Buscador de asignaturas',
  }
]

const ScheduleList = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  

  return (
    <div className="w-full h-full">
      <nav className="mb-5">
        <ul className="grid grid-cols-2 gap-4 justify-items-center pt-20 w-full">
          {tabs.map((item: any) => (
            <li
              key={item.label}
              className={"text-xl font-medium cursor-pointer relative w-full flex justify-center text-center"}
              onClick={() => setSelectedTab(item)}
            >
              {`${item.icon} ${item.label}`}
              {item === selectedTab ? (
                <motion.div className="absolute w-full md:w-[70%] h-[1px] bg-dark-sesqui -bottom-1" layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col justify-center items-center w-full">
        <div
          key={selectedTab ? selectedTab.label : "empty"}
          className={'w-full md:w-[90%]'}
        >
          {
            selectedTab.id === 1
              ? (
                <Table titles={dataTable.titles} content={dataTable.content} />
              ) : (
                <div className="bg-dark-sesqui w-full p-10 opacity-80 rounded-lg">
                  <GradesSearcher />
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default ScheduleList