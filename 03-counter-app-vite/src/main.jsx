import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelloWorldApp } from './HelloWorldApp'
import { FirstApp } from './FirstApp';
import { CounterApp } from './CounterApp';

//estilo global
import './styles.css';
   
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CounterApp value={12} />
        {/* <FirstApp title="Hola, soy Goku" /> */}
    </React.StrictMode>
)