import { useEffect, useState } from "react";

const MainGrades = () => {
  const [info, setInfo] = useState(undefined)

  const getData = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true')

    let graphql = JSON.stringify({
      query: `query{\n    PendingCourses(userCode: \"${67890}\", academicHistoryCode: \"12345\"){\n        code\n        name\n        component\n        requirements\n    }\n}\n`,
    })

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      fetchOptions: {
        mode: 'no-cors'
      }
    };

    let url = process.env.GRAPHQL_URL ? process.env.GRAPHQL_URL : ''

      const res = await fetch(process.env.GRAPHQL_URL + '/graphql', requestOptions)
      .then(response => response.json())
      .then(result => { setInfo(result.data.PendingCourses) })
      .catch(error => console.log('error:', error));
  }

  useEffect(() => {
    getData()
  }, [])

  if (!info) return <p>nothing</p>

  return (
    <div>charged...</div>
  )
}

export default MainGrades
