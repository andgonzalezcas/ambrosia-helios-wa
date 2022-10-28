import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ThemeProvider } from "@material-tailwind/react";

import Layout from '../components/Layout'
import Login from '../components/Login'


function MyApp({ Component, pageProps }: AppProps) {
  const [isLoged, setISLoged] = useState(false)

  return (
      <ThemeProvider>
        {
          !isLoged
            ? (
              <Login setIsLoged={setISLoged} />
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>

            )
        }
      </ThemeProvider>
  )
}

export default MyApp
