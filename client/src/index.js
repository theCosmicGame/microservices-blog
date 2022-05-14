import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';

/* removed becaause of migration to React 18 which does not support render from ReactDOM
    ReactDOM.render(
        <App />, 
        container
    );
*/

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);