import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

/* Option A: removed becaause of migration to React 18 which does not support render from ReactDOM
    ReactDOM.render(
        <App />, 
        container
    );
*/

/* USE Option B  */
root.render(<App />);
