import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyle } from './Styles/GlobalStyle';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
