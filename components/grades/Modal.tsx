import { useEffect, useState } from "react"

interface IModal {
  setOpenModal: Function
  codeToModal: number
}

const Modal = ({ setOpenModal, codeToModal }: IModal) => {
  const [isLoading, setIsLoading] = useState(false)
  const [dataModal, setDataModal] = useState<any>()

  const getCoursesFetch = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true')

    let graphqlCourses = JSON.stringify({
      query: `query {\n    Courses(code: \"${codeToModal}\", name: \"\", component: \"\"){\n        code\n        name\n        component\n        requirements\n        groups{\n            code\n            capacity\n            taken\n            professor{\n                code\n                username\n                name\n            }\n            schedules{\n                day\n                building\n                classroom\n                timeOfStart\n                timeOfEnd\n            }            \n        }\n    }\n}`,
      variables: {}
    })

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphqlCourses,
      fetchOptions: {
        mode: 'no-cors'
      }
    };

    setIsLoading(true)

    fetch(process.env.GRAPHQL_URL + '/graphql', requestOptions)
      .then(response => response.json())
      .then(result => {
        setDataModal(result.data.Courses)
        try {
          if (result.data.Courses.length === 0)
            throw 'no course finded'
        } catch (error) {
          setOpenModal(false)
        }
      })
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getCoursesFetch()
  }, [])

  return (
    <div
      className="absolute flex w-screen h-screen z-10 bg-dark-sesqui bg-opacity-50 justify-center items-center"
    >
      <div
        className="absolute w-full h-full z-10"
        onClick={() => { setOpenModal(false) }}
      >
      </div>
      <section
        className="rounded-3xl shadow-2xl bg-dark-sesqui z-20"
      >
        {
          isLoading
            ? (
              <p className="m-10 text-white-sesqui text-2xl">Loading ...</p>
            ) : (
              dataModal &&
              <div className="p-8 text-center sm:p-12">
                <p className="font-semibold uppercase tracking-widest text-cyan-sesqui text-3xl">
                  {`${dataModal[0].name} (${dataModal[0].code})`}
                </p>

                <p className="mt-6 font-bold text-white-sesqui">
                  {`Tipologia: ${dataModal[0].component}`}
                </p>
                <hr />
                <div className="flex justify-start text-start">
                  {
                    dataModal[0].groups.map((group: any, index: number) => {
                      return (
                        <div key={index}>
                          <p className="mt-6 font-bold text-white-sesqui">
                            {`Grupo: ${group.code}`}
                          </p>
                          <p className="mt-6 font-bold text-white-sesqui">
                            {`Profesor: ${group.professor.name}`}
                          </p>
                          <p className="mt-6 font-bold text-white-sesqui">
                            {`Cupos: ${group.capacity - group.taken}`}
                          </p>
                          <p className="mt-6 font-bold text-white-sesqui">{`Horarios:`}</p>
                          {
                            group.schedules.map((schedule: any, index: number) => {
                              return (
                                <p key={index} className="mt-6 font-bold text-white-sesqui">
                                  {`--> ${schedule.day} de ${schedule.timeOfStart} a ${schedule.timeOfEnd} en el salon ${schedule.classroom} del edificio ${schedule.building}`}
                                </p>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }
                </div>
                <hr />
              </div>
            )
        }
      </section>
    </div>
  )
}

export default Modal