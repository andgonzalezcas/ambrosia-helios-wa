import { useEffect, useState } from "react"
import { Select, Option, Input, Button } from "@material-tailwind/react"
import client from "../graphQl/apollo-client"
import { GET_CHARACTERS, GET_COURSES } from "../graphQl/Queries"
import { gql } from "@apollo/client"

const GradesSearcher = () => {
  const [inputOption, setInputOption] = useState(0)
  const [tipoOption, setTipoOption] = useState(0)
  const labelOptions = ["Elija un metodo de busqueda", "Numero sin caracteres", "Nombre"]

  const [info, setInfo] = useState(undefined)

  const getData = async () => {
    const { data } = await client.query({ query: GET_COURSES });
    //setInfo(data)
    console.log(data)
  }

  useEffect(() => {
    getData()
  }, [])

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
                required
              />

            ) : (
              <Select variant="outlined" label="Metodo de busqueda" color="amber" style={{ color: 'white' }}>
                <Option onClick={() => setTipoOption(1)}>Libre eleccion</Option>
                <Option onClick={() => setTipoOption(2)}>Fundamentacion</Option>
                <Option onClick={() => setTipoOption(3)}>Disciplinar</Option>
              </Select>
            )
        }
      </div>
      <Button className="col-span-2" color="amber" disabled={inputOption === 0 ? true : false}>Consultar</Button>
    </div>
  )
}

export default GradesSearcher