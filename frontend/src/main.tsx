import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyle } from './Styles/GlobalStyle';
import { RouterProvider } from 'react-router-dom';
import router from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
