import React from 'react';
import ReactDOM from 'react-dom/client';

// Fontes auto-hospedadas (sem requisições externas)
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource-variable/montserrat';

import './styles/tokens.css';
import './styles/base.css';
import './components/ui/ui.css';
import './components/layout/layout.css';
import './components/sections/sections.css';
import './components/configurator/configurator.css';
import './components/checkout/checkout.css';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
