import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { SocketContextProvider } from './SocketContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SocketContextProvider>
    <App />
    </SocketContextProvider>
  </React.StrictMode>
)
