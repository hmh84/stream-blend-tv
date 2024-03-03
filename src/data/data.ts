import { SxProps, Theme } from '@mui/material';
import { findOrCreatePlayer } from '../utils/chrome';
import { scrapeNetflixVideosFromGenre, netflixService } from './netflix';

export type StyleObj = { [key: string]: SxProps<Theme> };

export const appName = 'StreamBlend TV';
export const extensionId = chrome.runtime.id;
export const extensionBaseUrl = `chrome-extension://${extensionId}`;

export interface StreamingService {
	id: 'NETFLIX' | 'HULU' | 'MAX';
	name: string;
	baseUrl: string;
	genres: StreamingGenre[];
}

export interface StreamingGenre {
	id: string;
	name: string;
}

export interface StreamingVideo {
	name: string;
	url: string;
}

export const streamingServices: StreamingService[] = [netflixService];

export const getStreamingService = (id: StreamingService['id']) => {
	return streamingServices.find(
		(service) => service.id === id,
	) as StreamingService;
};

export const createQueue = async (
	service: StreamingService,
	genre: StreamingGenre,
) => {
	let videos: StreamingVideo[] | undefined = undefined;

	switch (service.id) {
		case 'NETFLIX':
			videos = await scrapeNetflixVideosFromGenre(genre);
			break;
		default:
			console.error('Unknown service', service);
			return undefined;
	}

	if (!videos) {
		console.error('No videos found');
		return undefined;
	}

	const queue: StreamingVideo[] = shuffleArray(videos);

	return queue;
};

export const startPlayer = async (
	service: StreamingService,
	genre: StreamingGenre,
) => {
	const queue = await createQueue(service, genre);

	if (!queue || queue.length === 0) {
		console.error('No videos found');
		return;
	}

	await chrome.storage.session.set({ queue });

	await findOrCreatePlayer(
		true,
		`${extensionBaseUrl}/player.html?service=${service.id}&genre=${genre.id}`,
	);
};

const shuffleArray = (array: any[]) => {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
};

export const getStoredQueue = async () => {
	return (await chrome.storage.session.get('queue'))?.queue as
		| StreamingVideo[]
		| undefined;
};

export const getVideos = async (
	service: StreamingService,
	genre: StreamingGenre,
) => {
	const res = (await chrome.storage.session.get('videos'))?.[service.id]?.[
		genre.id
	] as StreamingVideo[] | undefined;

	console.log(res);

	return res;
};
