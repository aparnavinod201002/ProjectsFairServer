import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import ContextShare from '../ContextAPI/ContextShare.jsx'
import TokenAuth from '../ContextAPI/TokenAuth.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <ContextShare>
   <TokenAuth>
   <App />
   </TokenAuth>
   </ContextShare>
   
   </BrowserRouter>
  </StrictMode>,
)
