import client from "../../graphQl/apollo-client";
import { GET_CHARACTERS } from '../../graphQl/Queries';
import { useEffect, useState } from "react";

const MainGrades = () => {
  const [info, setInfo] = useState(undefined)

  const getData = async () => {
    const { data } = await client.query({ query: GET_CHARACTERS });
    setInfo(data)
    console.log(data)
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
