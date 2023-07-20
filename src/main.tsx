import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

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
    Authorization:
      'bearer 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',
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
