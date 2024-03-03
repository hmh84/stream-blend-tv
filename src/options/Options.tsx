import { Box, Button, Typography } from '@mui/material';
import FeatureLayout from '../components/FeatureLayout';

import initApp from '../index';
import { StyleObj, getVideos } from '../data/data';
import { netflixService } from '../data/netflix';

const onResetStoredData = async () => {
	await chrome.storage.local.clear();
};

const onViewStoredVideos = async () => {
	await getVideos(netflixService, netflixService.genres[0]);
};

const Options = () => {
	return (
		<FeatureLayout title='Options'>
			<Typography variant='h4' component='h1'>
				Options
			</Typography>
			<Box sx={styles.optionContainer}>
				<Button variant='outlined' onClick={onResetStoredData}>
					Reset Stored Data
				</Button>
				<Button variant='outlined' onClick={onViewStoredVideos}>
					View Stored Videos
				</Button>
			</Box>
		</FeatureLayout>
	);
};

initApp(Options);

const styles: StyleObj = {
	optionContainer: {
		display: 'flex',
		flexDirection: 'column',
		gap: 1,
		maxWidth: 300,
	},
};

// import { Box, Typography } from '@mui/material';
// import { useEffect, useState } from 'react';

// import {
// 	StreamingVideo,
// 	appName,
// 	extensionBaseUrl,
// 	getStoredQueue,
// } from '../data/data';
// import { findOrCreatePlayer } from '../utils/chrome';

// const url = new URL(window.location.href);
// const service = url.searchParams.get('service');
// const genre = url.searchParams.get('genre');
// const videoId = url.searchParams.get('videoId');

// const goToPopup = async () => {
// 	await findOrCreatePlayer(true, `${extensionBaseUrl}/popup.html`);
// };

// function Player() {
// 	const [loading, setLoading] = useState(true);
// 	const [queue, setQueue] = useState<StreamingVideo[] | undefined>(undefined);
// 	const [currentVideo, setCurrentVideo] = useState<
// 		StreamingVideo | undefined
// 	>(undefined);
// 	const [nextVideo, setNextVideo] = useState<StreamingVideo | undefined>(
// 		undefined,
// 	);

// 	useEffect(() => {
// 		(async () => {
// 			if (!service || !genre) {
// 				await goToPopup();
// 			}

// 			const storedQueue = await getStoredQueue();

// 			if (!storedQueue) {
// 				console.error('No queue found');
// 				await goToPopup();
// 				return;
// 			}

// 			setQueue(storedQueue as StreamingVideo[]);

// 			const video = videoId
// 				? storedQueue.find((video) => video.url.includes(videoId))
// 				: storedQueue[0];

// 			if (!video) {
// 				console.error('No video found');
// 				return;
// 			}

// 			if (!!videoId) {
// 				setCurrentVideo(video);

// 				const currentIndex = storedQueue.indexOf(
// 					video as StreamingVideo,
// 				);
// 				const nextIndex = currentIndex + 1;
// 				setNextVideo(storedQueue[nextIndex]);
// 				setLoading(false);
// 			} else {
// 				url.searchParams.set('videoId', video.url);
// 				window.location.href = url.href;
// 			}
// 		})();
// 	}, []);

// 	if (!service || !genre) {
// 		return null;
// 	}

// 	return (
// 		<Box sx={{ p: 1 }}>
// 			<Typography variant='h3' component='h1'>
// 				{appName} - Player
// 			</Typography>
// 			{loading ? (
// 				<Typography>Loading...</Typography>
// 			) : currentVideo ? (
// 				<Box
// 					component='iframe'
// 					sx={{ border: 'none' }}
// 					src={currentVideo.url}
// 				/>
// 			) : (
// 				<Typography>No video found</Typography>
// 			)}
// 			{nextVideo && (
// 				<Typography variant='h4' component='h2'>
// 					Up Next: {nextVideo.name}
// 				</Typography>
// 			)}
// 		</Box>
// 	);
// }
