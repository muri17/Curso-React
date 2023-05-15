import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecetasApp } from './RecetasApp'
import { BrowserRouter } from 'react-router-dom'

import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecetasApp />
    </BrowserRouter>
  </React.StrictMode>,
)
