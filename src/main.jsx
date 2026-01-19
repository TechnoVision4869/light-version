import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import SidebarContextProvider from "./store/SidebarContextProvider";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SidebarContextProvider>
      <App />
    </SidebarContextProvider>
  </StrictMode>,
)
