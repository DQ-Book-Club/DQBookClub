import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <nav>
      <span>DQ Book Club</span>
      <a href='/notes/'><img src='/file.svg' alt='Notes' /></a>
    </nav>
    <App />
  </React.StrictMode>
)
