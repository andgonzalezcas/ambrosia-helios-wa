import type { NextPage } from 'next'
import Head from 'next/head'
import SmallBox from '../components/SmallBox'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <title>Ambrosia</title>
      </Head>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 justify-items-center content-center max-w-4xl w-full h-full p-5'>
        <h1 className='md:col-span-2 text-6xl font-bold'>!Hola Paul!</h1>
        <SmallBox title='Daily message' className='bg-blue-sesqui justify-center'>
          <p>Ten un hermoso dia 😙</p>
        </SmallBox>
        <SmallBox title='Próxima cita' className='bg-orange-sesqui'>
          <div className='grid grid-cols-2 grid-rows-2 justify-items-center content-center items-center'>
            <p className='text-7xl font-bold row-span-2'>16</p>
            <div className='row-span-3'>
              <p>14:30</p>
              <span>-</span>
              <p>15:00</p>
            </div>
            <p className='font-bold'>Marzo</p>
          </div>
        </SmallBox>
        <SmallBox title='Horario' className='md:col-span-2 bg-purple-sesqui'>
          <p>box 3 content</p>
        </SmallBox>
      </div>
    </>
  )
}

export default Home
