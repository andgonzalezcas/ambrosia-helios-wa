import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ThemeProvider } from "@material-tailwind/react";

import Layout from '../components/Layout'
import Login from '../components/Login'


function MyApp({ Component, pageProps }: AppProps) {
  const [isLoged, setISLoged] = useState(false)
  const [username, setUsername] = useState('Paul')
  const [userRol, setUserRol] = useState<'Estudiante' | 'Docente'>('Estudiante')

  return (
    <ThemeProvider>
      {
        !isLoged
          ? (
            <Login setIsLoged={setISLoged} />
          ) : (
            <Layout userRol={userRol}>
              <Component {...pageProps} setIsLoged={setISLoged} username={username} userRol={userRol} />
            </Layout>
          )
      }
    </ThemeProvider>
  )
}

export default MyApp
