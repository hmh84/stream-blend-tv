import { Box, Button, Typography } from '@mui/material';

import { appName, netflixGenres, netflixBaseUrl } from '../data/data';
import initApp from '../index';

function Popup() {
	const onGenreClick = (genreId: number) => {
		chrome.tabs.query(
			{ currentWindow: true, url: `${netflixBaseUrl}/*` },
			async (tabs) => {
				if (!tabs) {
					console.error(
						'Failed to get tabs from "chrome.tabs.query"',
					);
					return;
				}

				const url = `${netflixBaseUrl}/browse/m/genre/${genreId}/`;
				let tab: chrome.tabs.Tab | undefined = undefined;

				if (tabs.length > 0) {
					const lastTab = tabs[tabs.length - 1];
					tab = await chrome.tabs.update(lastTab.id as number, {
						url,
					});
				} else {
					tab = await chrome.tabs.create({ url });
				}

				if (!tab) {
					console.error('Failed to create or update tab');
					return;
				}

				await chrome.windows.update(tab.windowId as number, {
					focused: true,
				});

				await chrome.scripting.executeScript({
					target: { tabId: tab.id as number },
					func: () => {
						const watchableAnchors =
							document.querySelectorAll<HTMLAnchorElement>(
								'a[href^="/watch/"]',
							);

						if (watchableAnchors.length === 0) {
							console.error('No watchable items found');
							return;
						}

						const data = Array.from(watchableAnchors).map(
							(item) => ({
								title: item.title,
								href: item.href,
							}),
						);

						chrome.storage.session.set({ watchableItems: data });
					},
				});
			},
		);
	};

	return (
		<Box sx={{ p: 1 }}>
			<Typography variant='h3' component='h1'>
				{appName}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					gap: 1,
				}}
			>
				{netflixGenres.map(({ id, name }, index) => (
					<Button
						key={`genre-btn-${index}-${id}`}
						variant='contained'
						onClick={() => onGenreClick(id)}
						sx={{
							'bgcolor': 'transparent',
							'color': '#000',
							':hover': {
								color: '#fff',
							},
						}}
					>
						{name}
					</Button>
				))}
			</Box>
		</Box>
	);
}

initApp(Popup);
