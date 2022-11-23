import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ThemeProvider } from "@material-tailwind/react";

import Layout from '../components/Layout'
import Login from '../components/Login'
import Modal from '../components/grades/Modal';


function MyApp({ Component, pageProps }: AppProps) {
  const [isLoged, setISLoged] = useState(false)
  const [username, setUsername] = useState('Paul')
  const [userRol, setUserRol] = useState<'Estudiante' | 'Docente'>('Estudiante')
  const [userCode, setUserCode] = useState<number>(12345)
  const [openModal, setOpenModal] = useState(false)
  const [codeToModal, setCodeToModal] = useState(0)

  return (
    <ThemeProvider>
      {
        !isLoged
          ? (
            <Login setIsLoged={setISLoged} />
          ) : (
            <>
              {
                openModal && <Modal setOpenModal={setOpenModal} codeToModal={codeToModal} />
              }
              <Layout userRol={userRol}>
                <Component
                  {...pageProps}
                  setIsLoged={setISLoged}
                  username={username}
                  userRol={userRol}
                  userCode={userCode}
                  setOpenModal={setOpenModal}
                  setCodeToModal={setCodeToModal}
                />
              </Layout>
            </>
          )
      }
    </ThemeProvider>
  )
}

export default MyApp
