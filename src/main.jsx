import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// Importer jeres tokens.css før styles.css, når I opretter den i øvelse 1.
import './styles.css';

createRoot(document.getElementById('root')).render(<App />);
