import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
query {
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      name
    }
  }
  location(id: 1) {
    id
  }
  episodesByIds(ids: [1, 2]) {
    id
  }
}
`

export const GET_COURSES = gql`
  query{
    Courses(code: "12345", name: "test_course_name", component: "test_course_component"){
      code
    }
  }
`