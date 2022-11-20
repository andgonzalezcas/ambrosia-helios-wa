import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GradesSearcher from "../components/GradesSearcher";
import TableGrades from "../components/grades/Table";

const dataTable = {
  content: [
    {
      name: 'Introducción a las ciencias de la computación y a la programación (202654)',
      type: 'Diciplinar Optativa',
      credits: 3,
      quota: 24
    },
    {
      name: 'Computación paralela y distribuida (2016722)',
      type: 'Diciplinar Optativa',
      credits: 3,
      quota: 2
    },
    {
      name: 'Taller de proyector interdiciplinarios (2024045)',
      type: 'Diciplinar Optativa',
      credits: 4,
      quota: 6
    },
    {
      name: 'Computación visual (2025960)',
      type: 'Diciplinar Optativa',
      credits: 3,
      quota: 5
    }
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

  const pendingGradesFetch = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    /* let graphql = JSON.stringify({
      query: "query{\n    PendingCourses(userCode: \"12345\", academicHistoryCode: \"12345\"){\n        code\n        name\n        component\n        requirements\n    }\n}\n",
      variables: {}
    }) */

    var graphql = JSON.stringify({
      query: "query {\n    UserCourses(userCode: \"67890\"){\n        courseCode\n        name   \n        professor{\n            code\n            username\n            name\n        }\n        schedules{\n            day\n            building\n            classroom\n            timeOfStart\n            timeOfEnd\n        }            \n    }\n}",
      variables: {}
    })

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
    };

    fetch("https://ambrosia-cronos-ag-4axjffbidq-uc.a.run.app/graphql", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    pendingGradesFetch()
  })

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
                <TableGrades content={dataTable.content} />
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