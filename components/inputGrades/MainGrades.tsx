import client from "../../graphQl/apollo-client";
import { GET_CHARACTERS } from '../../graphQl/Queries';
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";

const MainGrades = () => {
  const [info, setInfo] = useState(undefined)

  const getData = async () => {
    const { data } = await client.query({
      query: GET_CHARACTERS
    });

    setInfo(data)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    console.log('something')
    console.log(info)
  }, [info])

  if (!info) return <p>nothing</p>

  return (
    <div>charged...</div>
  )
}

export default MainGrades
