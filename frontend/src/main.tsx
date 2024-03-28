import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './Styles/GlobalStyle';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import router from './router';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.withCredentials = true;
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <GlobalStyle />
      <RouterProvider router={router} />
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById('root')
);
