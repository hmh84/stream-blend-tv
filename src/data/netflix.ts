import { StreamingGenre, StreamingService, StreamingVideo } from './data';

export const netflixGenres: StreamingGenre[] = [
	// Normal example
	// https://www.netflix.com/watch/81212177?trackId=14170286&tctx=2%2C0%2Cdb5e46e1-0016-4801-83fa-bef545a4fd05-5156608%2CNES_EDA0ACD3A0EE36B40CA302FB8C3073-994911DC4F528C-246D9A40FA_p_1708656285252%2CNES_EDA0ACD3A0EE36B40CA302FB8C3073_p_1708656285252%2C%2C%2C%2C%2CVideo%3A80986854%2CminiDpPlayButton
	// https://www.netflix.com/watch/81212177?trackId=14170286

	// Anime example
	// https://www.netflix.com/watch/81015879?trackId=250322545&tctx=1%2C0%2Cdb5e46e1-0016-4801-83fa-bef545a4fd05-5211992%2CNES_6D02943813BC7919DCE67FD56095C8-DA1E3B0A33B938-7066962EF5_p_1708656973636%2C%2C%2C%2C%2C%2CVideo%3A80107103%2CdetailsPagePlayButton
	// https://www.netflix.com/watch/81015880?trackId=250322545
	{
		id: '83',
		name: 'TV Shows',
	},
	{
		id: '89814',
		name: 'Award-Winning TV Shows',
	},
];

export const netflixService: StreamingService = {
	id: 'NETFLIX',
	name: 'Netflix',
	baseUrl: 'https://www.netflix.com',
	genres: netflixGenres,
};

export const scrapeNetflixVideosFromGenre = async (genre: StreamingGenre) => {
	const storedVideos = await chrome.storage.session.get('videos');
	const storedNetflixVideos = storedVideos?.[netflixService.id];
	const storedGenreVideos = storedNetflixVideos?.[genre.id];

	if (!!storedGenreVideos) return storedGenreVideos as StreamingVideo[];

	const response = await fetch(
		`${netflixService.baseUrl}/browse/m/genre/${genre.id}/`,
	);

	const text = await response.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString(text, 'text/html');

	const watchableAnchors =
		doc.querySelectorAll<HTMLAnchorElement>('a[href^="/watch/"]');

	if (watchableAnchors.length === 0) {
		console.error('No watchable items found');
		return;
	}

	const genreVideos: StreamingVideo[] = Array.from(watchableAnchors).map(
		(item) => {
			const videoId = item.href.split('/watch/')[1]?.split('?')[0];
			return {
				name: item.ariaLabel as string,
				url: getNetflixWatchUrl(videoId),
			};
		},
	);

	await chrome.storage.session.set({
		videos: {
			...storedVideos,
			[netflixService.id]: {
				...storedNetflixVideos,
				[genre.id]: genreVideos,
			},
		},
	});

	return genreVideos;
};

const getNetflixWatchUrl = (videoId: string) => {
	return `${netflixService.baseUrl}/watch/${videoId}`;
};
