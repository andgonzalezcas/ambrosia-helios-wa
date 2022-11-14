import { Button } from "@material-tailwind/react"



const Profile = ({ setIsLoged }: any) => {
  return (
    <div className="flex justify-center items-center">
      <Button
        className="h-fit text-3xl"
        color="lime"
        onClick={() => setIsLoged(false)}
      >Log out</Button>
    </div>
  )
}

export default Profile