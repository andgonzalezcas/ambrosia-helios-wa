import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import Table from "../components/Table";

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
    icon: '📖',
    label: 'Asignaturas disponibles para cursar',
    content: (
      <Table titles={dataTable.titles} content={dataTable.content}/>
    )
  },
  {
    icon: '🌐',
    label: 'Buscador de asignaturas',
    content: (
      <p>Soy el content, pero del otro lado</p>
    )
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
                <motion.div className="absolute w-full md:w-[70%] h-1 bg-cyan-sesqui -bottom-1" layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex justify-center items-center">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab ? selectedTab.content : "😋"}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ScheduleList