// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const loginClient = new ApolloClient({
    uri: 'https://096f3786-61c9-49ad-8bad-c6e39fcfca92.mock.pstmn.io',
    cache: new InMemoryCache(),
})

const client = new ApolloClient({
    uri: "https://ambrosia-cronos-ag-4axjffbidq-uc.a.run.app",
    cache: new InMemoryCache(),
});

export default client;