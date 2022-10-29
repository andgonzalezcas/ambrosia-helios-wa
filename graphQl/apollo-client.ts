// ./apollo-client.js

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";


const cosa = new HttpLink({
    //uri: "https://ambrosia-cronos-ag-4axjffbidq-uc.a.run.app",
    uri: 'https://rickandmortyapi.com/graphql',
    fetchOptions: {
        mode: 'no-cors'
    },
    
    fetch
})

const loginClient = new ApolloClient({
    uri: 'https://096f3786-61c9-49ad-8bad-c6e39fcfca92.mock.pstmn.io',
    cache: new InMemoryCache(),
})

const client = new ApolloClient({
    uri: "https://ambrosia-cronos-ag-4axjffbidq-uc.a.run.app/graphql",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
    },
    cache: new InMemoryCache(),
    //link: cosa
})

export default client;