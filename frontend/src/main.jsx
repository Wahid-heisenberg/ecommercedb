
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"
import App from './App.jsx';
import '../styles.css';

import CartContextProvider from './Context/CartContext.jsx';


createRoot(document.getElementById('root')).render( // Use createRoot instead of ReactDOM.createRoot
  <CartContextProvider>
    <App />
  </CartContextProvider>
);
