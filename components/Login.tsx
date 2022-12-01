import Image from "next/image"
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@material-tailwind/react";
import { useState } from "react";

interface Ilogin {
  setIsLoged: Function
}


const Login = ({ setIsLoged }: Ilogin) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
      query: "query {\n    AllCourses(service: 'CampusKid'){  \n        data\n    }\n}",
      variables: {}
    })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
    };

    fetch("35.239.141.87:5000/graphql", requestOptions)
      .then(response => response.text())
      .then(result => {
        setIsLoged(true)
      })
      .catch(error => console.log('error', error));
  }

  const handleUsername = (e: any) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e: any) => {
    setPassword(e.target.value)
  }

  return (
    <div className="w-creen h- h-screen min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-login-background bg-cover">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <Card className="w-96 bg-dark-sesqui">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-44 place-items-center bg-white-sesqui w-[70%] mx-auto"
          >
            <div className="w-full flex justify-center">
              <Image src={'/images/Logotipo_de_la_Universidad_Nacional_de_Colombia.png'} width={150} height={150} alt={'Unal logo'} />
            </div>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="username" size="lg" color="lime" style={{ color: '#F7EED3' }} onChange={handleUsername} value={username} />
            <Input label="password" size="lg" type='password' color="lime" style={{ color: '#F7EED3' }} onChange={handlePassword} value={password} />
            {/* <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              color="lime"
              fullWidth
              onClick={() => { handleClick() }}
            >
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Login