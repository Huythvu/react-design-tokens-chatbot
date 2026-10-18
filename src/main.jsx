import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import TokenTypesSlide from './TokenTypesSlide.jsx';
import './tokens.css';
import './styles.css';

const showSlide = new URLSearchParams(window.location.search).get('slide') === '6';
createRoot(document.getElementById('root')).render(showSlide ? <TokenTypesSlide /> : <App />);
