import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

const apiAuth =
  import.meta.env.VITE_AUTHORIZATION ??
  prompt('Введите АПИ-ключ вместе со словом bearer')

const client = new ApolloClient({
  uri: import.meta.env.VITE_BASE_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          search: relayStylePagination(),
        },
      },
    },
  }),
  headers: {
    Authorization: apiAuth,
    'X-Github-Next-Global-ID': '1',
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
)
