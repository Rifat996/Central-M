import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import "bootstrap/dist/css/bootstrap.min.css"


const root = document.getElementById('root');

const rootElement = ReactDOM.createRoot(root);
rootElement.render(<App />);