import { useEffect, useState } from "react";
import SelectTable from "./SelectTable";

interface IMainGrades {
  userCode: string
  selectedCourses: any
  setSelectedCourses: Function
}

const MainGrades = ({ userCode, selectedCourses, setSelectedCourses }: IMainGrades) => {
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
      .then(result => {
        const auxArray: any = []
        result.data.PendingCourses.map((item: any) => {
          var graphqlGetCourses = JSON.stringify({
            query: `query {\n    Courses(code:\"${item.code}\", name: \"\", component: \"\"){\n        code\n        name\n  groups{\n            code\n            capacity\n            taken\n            professor{\n name\n            }\n            schedules{\n                day\n                timeOfStart\n                timeOfEnd\n            }            \n        }\n}\n}`,
          })

          let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphqlGetCourses,
            fetchOptions: {
              mode: 'no-cors'
            }
          };

          fetch(process.env.GRAPHQL_URL + '/graphql', requestOptions)
            .then(response => response.json())
            .then(result => auxArray.push(result.data?.Courses[0]))
            .catch(error => console.log(error))
        })

        return auxArray
      })
      .then(auxArray => setDataTable(auxArray))
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
          : <SelectTable content={dataTable} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} />
      }
    </>
  )
}

export default MainGrades
