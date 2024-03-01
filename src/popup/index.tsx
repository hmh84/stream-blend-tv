import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../index.css';
import Popup from './Popup';

const container = document.createElement('div');
container.classList.add('root');
document.body.appendChild(container);
const root = createRoot(container);

root.render(
	<StrictMode>
		<Popup />
	</StrictMode>,
);
