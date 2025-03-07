import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios'
import Root from './Root'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Automatically check authentication on page load

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
