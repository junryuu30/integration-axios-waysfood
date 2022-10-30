import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from "react-query";
// import { UserContextProvider } from './context/userContext';
import { UserContextProvider } from './Contexts/userContext';
import { BrowserRouter } from 'react-router-dom';

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));


//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
// );
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
      <QueryClientProvider client={client}>
          <App />
      </QueryClientProvider>
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
