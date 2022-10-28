import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ThemeProvider } from "@material-tailwind/react";
import { ApolloProvider } from 'react-apollo';

import { client } from '../graphQl/apolloClient';
import Layout from '../components/Layout'
import Login from '../components/Login'


function MyApp({ Component, pageProps }: AppProps) {
  const [isLoged, setISLoged] = useState(false)

  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default MyApp
