import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GradesSearcher from "../components/GradesSearcher";
import TableGrades from "../components/grades/Table";

interface IScheduleList {
  setOpenModal: Function
  setCodeToModal: Function
  userCode: number
}

const ScheduleList = ({ setOpenModal, setCodeToModal, userCode }: IScheduleList) => {
  const tabs = [
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
  const [selectedTab, setSelectedTab] = useState(0);
  const [dataTable, setDataTable] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const pendingCoursesFetch = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true')

    var graphqlPendignCourses = JSON.stringify({
      query: `query{\n    PendingCourses(userCode: \"${userCode}\", academicHistoryCode: \"\"){\n        code\n        name\n        component\n        requirements\n    }\n}\n`,
      variables: {}
    })

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphqlPendignCourses,
      fetchOptions: {
        mode: 'no-cors'
      }
    };

    setIsLoading(true)

    fetch(process.env.GRAPHQL_URL + '/graphql', requestOptions)
      .then(response => response.json())
      .then(result => setDataTable(result.data.PendingCourses))
      .then(() => setIsLoading(false))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    if (selectedTab === 0)
      pendingCoursesFetch()
    else
      setDataTable([])
  }, [selectedTab])

  return (
    <div className="w-full h-full">
      <nav className="mb-5">
        <ul className="grid grid-cols-2 gap-4 justify-items-center pt-20 w-full">
          {tabs.map((item: any, index: number) => (
            <li
              key={item.label}
              className={"text-xl font-medium cursor-pointer relative w-full flex justify-center text-center"}
              onClick={() => setSelectedTab(index)}
            >
              {`${item.icon} ${item.label}`}
              {item === tabs[selectedTab] ? (
                <motion.div className="absolute w-full md:w-[70%] h-[1px] bg-dark-sesqui -bottom-1" layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col justify-center items-center w-full">
        <div
          key={tabs[selectedTab] ? tabs[selectedTab].label : "empty"}
          className={'w-full md:w-[90%]'}
        >
          {
            tabs[selectedTab].id === 1
              ? (
                <div className="bg-dark-sesqui w-full p-10 opacity-80 rounded-lg">
                  <TableGrades content={dataTable} setOpenModal={setOpenModal} setCodeToModal={setCodeToModal} />
                  {
                    isLoading
                      ? <p className="text-sm font-medium text-white-sesqui px-6 py-4 text-left">Loading ...</p>
                      : <></>
                  }
                </div>
              ) : (
                <div className="bg-dark-sesqui w-full p-10 opacity-80 rounded-lg">
                  <GradesSearcher setDataTable={setDataTable} setIsLoading={setIsLoading} />
                  <TableGrades content={dataTable} setOpenModal={setOpenModal} setCodeToModal={setCodeToModal} />
                  {
                    isLoading
                      ? <p className="text-sm font-medium text-white-sesqui px-6 py-4 text-left">Loading ...</p>
                      : <></>
                  }
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default ScheduleList