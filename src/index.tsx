// module
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
// custom
import App from './App.tsx'


const preventInspect = () => {
  window.onkeydown = (e: KeyboardEvent) => {
    if (e.key === 'F12') {
      e.preventDefault();
    }
  };

  const html: HTMLHtmlElement = document.getElementsByTagName('html')[0];
  html.oncontextmenu = () => { return false; };

  const minimalUserResponseInMiliseconds = 100;
  const before: number = new Date().getTime();
  // eslint-disable-next-line no-debugger
  debugger
  const after: number = new Date().getTime();
  if (after - before > minimalUserResponseInMiliseconds) {
    window.stop();
  } else {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    )
  }
};

if (import.meta.env.VITE_MODE === 'production') {
  preventInspect();
} else {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
}