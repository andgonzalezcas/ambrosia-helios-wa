import { useEffect, useState } from "react";

const MainGrades = () => {
  const [info, setInfo] = useState(undefined)

  const getData = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let graphql = JSON.stringify({
      variables: {
        userCode: 67890
      },
      query: "query {\n    UserCourses($userCode: Int!){\n courseCode\n name\n}\n}",
    })

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql
    };

    fetch("https://ambrosia-cronos-ag-4axjffbidq-uc.a.run.app/graphql", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
      })
      .catch(error => console.log('error', error));
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
