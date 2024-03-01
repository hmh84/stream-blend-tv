import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../index.css';
import Player from './Player';

const container = document.createElement('div');
container.classList.add('root');
document.body.appendChild(container);
const root = createRoot(container);

root.render(
	<StrictMode>
		<Player />
	</StrictMode>,
);
