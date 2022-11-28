import { Button } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

interface IFinalSummary {
  historySelected: string
  selectedCourses: any
  userCode: string
}

const FinalSummary = ({ historySelected, selectedCourses, userCode }: IFinalSummary) => {
  const [finalCourses, setFinalCourses] = useState([])

  const handleFetch = () => {
    let coursesString = '\n'
    selectedCourses.map((course: any) => {
      coursesString = coursesString + ` \"${course}\", \n `
    })
    return coursesString
  }

  const enrollCourses = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true')

    let graphql = JSON.stringify({
      query: `mutation{    \n    EnrollCourses(input: {\n        studentCode: \"${userCode}\",\n        academicHistoryCode: \"${historySelected}\",\n courseGroups: [${handleFetch()}] \n    }){\n        studentCode\n        courseGroups\n    }\n}`,
      variables: {}
    })

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      fetchOptions: {
        mode: 'no-cors'
      }
    };

    console.log(graphql)

    fetch(process.env.GRAPHQL_URL + '/graphql', requestOptions)
      .then(response => response.text())
      .then(() => { alert('Materias inscritas') })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    setFinalCourses(selectedCourses)
  }, [selectedCourses])

  return (
    <div className="grid grid-cols-2">
      <h2 className="text-4xl font-medium text-white-sesqui px-6 py-4 text-center col-span-2">Resumen final de inscripción</h2>
      <p className="text-xl font-medium text-white-sesqui px-6 py-4 text-center">{`Historia Academica en la que se inscribira:`}</p>
      <p className="text-xl font-medium text-white-sesqui px-6 py-4 text-center">{`${historySelected}`}</p>
      {
        finalCourses.map((course: string, index: number) => {
          return (
            <>
              <p className="text-xl font-medium text-white-sesqui px-6 py-4 text-center">{`${index + 1} - ID de curso:`} </p>
              <p className="text-xl font-medium text-white-sesqui px-6 py-4 text-center">{`${course}`} </p>
            </>
          )
        })
      }
      <Button
        className="col-span-2"
        color="amber"
        onClick={() => { enrollCourses() }}
      >Inscribir materias</Button>
    </div>
  )
}

export default FinalSummary