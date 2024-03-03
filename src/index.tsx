import { FC, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

export default function initApp(App: FC, isPopup = false) {
	const container = document.createElement('div');
	container.classList.add('root');
	isPopup && document.querySelector('html')?.classList.add('popup');
	document.body.appendChild(container);
	const root = createRoot(container);

	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
