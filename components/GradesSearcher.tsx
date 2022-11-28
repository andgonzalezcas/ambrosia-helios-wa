import { useEffect, useState } from "react"
import { Select, Option, Input, Button } from "@material-tailwind/react"

interface IGradesSearcher {
  setDataTable: Function
  setIsLoading: Function
}

const GradesSearcher = ({ setDataTable, setIsLoading }: IGradesSearcher) => {
  const [inputOption, setInputOption] = useState(0)
  const [searchOption, setSearchOption] = useState<any>()
  const labelOptions = ["Elija un metodo de busqueda", "Numero sin caracteres", "Nombre"]

  const handleFetch = () => {
    let optionString = ''
    if (inputOption === 1) {
      optionString = 'code:\"' + searchOption + '\", name: \"\", component: \"\"'
    } else if (inputOption === 2) {
      optionString = 'code:\"\", name: \"' + searchOption + '\", component: \"\"'
    } else {
      optionString = 'code:\"\", name: \"\", component: \"' + searchOption + '\"'
    } return optionString
  }

  const getCoursesFetch = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true')

    var graphqlGetCourses = JSON.stringify({
      query: `query {\n    Courses(${handleFetch()}){\n        code\n        name\n  groups{\n            code\n            capacity\n            taken\n            professor{\n name\n            }\n            schedules{\n                day\n                timeOfStart\n                timeOfEnd\n            }            \n        }\n}\n}`,
    })

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphqlGetCourses,
      fetchOptions: {
        mode: 'no-cors'
      }
    };

    setIsLoading(true)

    fetch(process.env.GRAPHQL_URL + '/graphql', requestOptions)
      .then(response => response.json())
      .then(result => { setDataTable(result.data.Courses) })
      .then(() => setIsLoading(false))
      .catch(error => console.log('error', error));
  }

  const handleClick = () => {
    getCoursesFetch()
  }

  const handleChange = (e: any) => {
    setSearchOption(e.target.value)
  }

  return (
    <div className="grid grid-cols-2 gap-2 w-full px-12 py-3 z-10 rounded-t-lg">
      <Select variant="outlined" label="Metodo de busqueda" color="amber" style={{ color: 'white' }}>
        <Option onClick={() => setInputOption(1)}>Codigo de asignatura</Option>
        <Option onClick={() => setInputOption(2)}>Nombre de asignatura</Option>
        <Option onClick={() => setInputOption(3)}>Tipologia de asignatura</Option>
      </Select>
      <div className="w-full">
        {
          inputOption !== 3
            ? (
              <Input
                label={labelOptions[inputOption]}
                disabled={inputOption === 0 ? true : false}
                color="amber"
                style={{ color: 'white' }}
                type={inputOption === 1 ? 'number' : 'text'}
                onChange={(e) => { handleChange(e) }}
                required
              />

            ) : (
              <Select variant="outlined" label="Metodo de busqueda" color="amber" style={{ color: 'white' }}>
                <Option onClick={() => setSearchOption('Libre Eleccion')}>Libre eleccion</Option>
                <Option onClick={() => setSearchOption('Fundamentacion')}>Fundamentacion</Option>
                <Option onClick={() => setSearchOption('Disciplinar')}>Disciplinar</Option>
              </Select>
            )
        }
      </div>
      <Button
        className="col-span-2"
        color="amber"
        disabled={inputOption === 0 ? true : false}
        onClick={() => { handleClick() }}
      >
        Consultar
      </Button>
    </div>
  )
}

export default GradesSearcher