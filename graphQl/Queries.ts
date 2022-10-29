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
      name
      component
      requirements
      groups{
        code
        capacity
        taken
        professor{
          code
          username
          name
        }
        schedules{                
          day
          building
          classroom
          timeOfStart
          timeOfEnd
        }            
      }
    }
  }
`