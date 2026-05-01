import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import './lit-components/index';
import './styles/global.css';
import App from './App';

const savedLang = localStorage.getItem('lang') ?? 'en';
document.documentElement.dir = savedLang === 'he' ? 'rtl' : 'ltr';
document.documentElement.lang = savedLang;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
