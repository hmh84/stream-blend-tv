import { FC, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

const container = document.createElement('div');
container.classList.add('root');
document.body.appendChild(container);
const root = createRoot(container);

export default function initApp(App: FC) {
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
