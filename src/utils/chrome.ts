import { extensionBaseUrl } from '../data/data';

export type ChromeTab = chrome.tabs.Tab;

export const findOrCreatePlayer = async (focus: boolean, newUrl?: string) => {
	const tabs = await chrome.tabs.query({
		currentWindow: true,
		url: `${extensionBaseUrl}/*`,
	});

	let tab: ChromeTab | undefined = undefined;

	if (tabs.length > 0) {
		tab = tabs[tabs.length - 1];

		if (!!newUrl) {
			tab = await chrome.tabs.update(tab.id as number, {
				url: newUrl,
			});
		}
	} else {
		tab = await chrome.tabs.create({ url: newUrl });
	}

	if (!tab) {
		console.error('Failed to create or update tab');
		return undefined;
	}

	if (focus) {
		await chrome.windows.update(tab.windowId as number, {
			focused: true,
		});
	}

	return tab;
};
