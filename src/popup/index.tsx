import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './Popup';

import '../index.css';

const root = document.createElement('div');
root.className = 'root';
document.body.appendChild(root);
const rootDiv = ReactDOM.createRoot(root);

rootDiv.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
);
