import { useEffect, useState } from "react"
import { Select, Option, Input, Button } from "@material-tailwind/react"

const GradesSearcher = () => {
  const [inputOption, setInputOption] = useState(0)
  const [tipoOption, setTipoOption] = useState(0)
  const labelOptions = ["Elija un metodo de busqueda", "Numero sin caracteres", "Nombre"]

  const [info, setInfo] = useState(undefined)

  const getData = async () => {
    const data = await fetch(
      process.env.GRAPHQL_URL + '/graphql',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          operationName: 'Courses',
          variables: {
            from: 0,
            size: 1,
            sort: 'PriceAsc',
            auctionType: 'Sale',
            criteria: {},
          },
          fetchOptions: {
            mode: 'no-cors'
          },
          query: 'query GetLandsGrid($from: Int!, $size: Int!, $sort: SortBy!, $owner: String, $criteria: LandSearchCriteria, $auctionType: AuctionType) {\n  lands(criteria: $criteria, from: $from, size: $size, sort: $sort, owner: $owner, auctionType: $auctionType) {\n    total\n    results {\n      ...LandBriefV2\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment LandBriefV2 on LandPlot {\n  tokenId\n  owner\n  landType\n  row\n  col\n  auction {\n    currentPrice\n    startingTimestamp\n    currentPriceUSD\n    __typename\n  }\n  ownerProfile {\n    name\n    __typename\n  }\n  __typename\n}\n',
        }),
      }
    )
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