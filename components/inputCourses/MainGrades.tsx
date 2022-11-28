import { useEffect, useState } from "react";
import SelectTable from "./SelectTable";

interface IMainGrades {
  setOpenModal: Function
  setCodeToModal: Function
  userCode: string
}

const MainGrades = ({ setOpenModal, setCodeToModal, userCode }: IMainGrades) => {
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
    pendingCoursesFetch()
  }, [])

  return (
    <>
      {
        isLoading
          ? <p className="text-sm font-medium text-white-sesqui px-6 py-4 text-left">Loading ...</p>
          : <SelectTable content={dataTable} />
      }
    </>
  )
}

export default MainGrades
