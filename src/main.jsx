import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import VooProvider from './components/context/VooProvider.jsx'


import Home from './components/pages/Home';
import EscolhaVoos from './components/pages/EscolhaVoos';
import DadosPassageiro from './components/pages/DadosPassageiro';
import Voo from './components/voo/voo';
import Voos from './components/pages/Voos';
import Cliente from './components/cliente/Cliente';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ReservaProvider } from './components/context/ReservaProvider.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:<App />,
    children: [
      {
        path:'/',
        element: <Home />
      },
      {
        path: '/escolha-voo',
        element: <EscolhaVoos />
      },
      {
        path: '/dados-passageiro',
        element: <DadosPassageiro />
      },
      {
        path: '/cadastro-voo',
        element: <Voo />
      },
      {
        path: '/voos',
        element: <Voos />
      },
      {
        path: '/cadastro-cliente',
        element: <Cliente />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReservaProvider>
      <VooProvider>
        <RouterProvider  router={router} />
      </VooProvider>
    </ReservaProvider>
  </React.StrictMode>,
)
