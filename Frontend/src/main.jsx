import React from 'react'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        // hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        theme="colodarkred"
      />
    </BrowserRouter>
  </React.StrictMode>,
);