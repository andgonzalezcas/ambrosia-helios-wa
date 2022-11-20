import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GradesSearcher from "../components/GradesSearcher";
import TableGrades from "../components/grades/Table";

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
  const [dataTable, setDataTable] = useState([])

  const pendingGradesFetch = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true')

    var graphqlPendignCourses = JSON.stringify({
      query: "query{\n    PendingCourses(userCode: \"12345\", academicHistoryCode: \"12345\"){\n        code\n        name\n        component\n        requirements\n    }\n}\n",
      variables: {}
    })

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphqlPendignCourses,
    };

    fetch(process.env.GRAPHQL_URL + '/graphql', requestOptions)
      .then(response => response.json())
      .then(result => console.log(setDataTable(result.data.PendingCourses)))
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
                <TableGrades content={dataTable} />
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