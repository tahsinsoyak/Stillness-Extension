import React from 'react';
import ReactDOM from 'react-dom/client';
import { OptionsApp } from './OptionsApp';
import '../index.css';
import { useSettingsStore } from '../shared/store/useSettingsStore';

// Initialize settings and theme
useSettingsStore.getState().loadSettings();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OptionsApp />
  </React.StrictMode>
);
