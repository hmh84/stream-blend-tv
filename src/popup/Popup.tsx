import { Box, Button, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

import {
	appName,
	streamingServices,
	StreamingService,
	StreamingGenre,
	startPlayer,
	StyleObj,
} from '../data/data';
import initApp from '../index';
import Cell from './components/Cell';
import FeatureLayout from '../components/FeatureLayout';

const onOpenSettings = async () => {
	await chrome.runtime.openOptionsPage();
};

const Popup = () => {
	const onGenreClick = async (
		service: StreamingService,
		genre: StreamingGenre,
	) => {
		await startPlayer(service, genre);
	};

	return (
		<FeatureLayout title='Popup'>
			<Box sx={styles.header}>
				<Typography variant='h4' component='h1'>
					{appName}
				</Typography>
				<Box>
					<IconButton aria-label='Close' onClick={onOpenSettings}>
						<SettingsIcon sx={{ color: '#fff' }} />
					</IconButton>
					<IconButton
						aria-label='Close'
						onClick={() => window.close()}
					>
						<CloseIcon sx={{ color: '#fff' }} />
					</IconButton>
				</Box>
			</Box>
			<Box sx={styles.genresContainer}>
				{streamingServices.map((service, serviceIndex) => (
					<Box
						key={`service-${serviceIndex}-${service.id}`}
						sx={styles.serviceRow}
					>
						<Cell sx={styles.serviceNameCell}>
							<Typography variant='h4' component='h2'>
								{service.name}
							</Typography>
						</Cell>
						{service.genres.map((genre, genreIndex) => (
							<Cell>
								<Button
									key={`genre-btn-${genreIndex}-${genre.id}`}
									variant='text'
									onClick={() => onGenreClick(service, genre)}
									sx={styles.genreButton}
								>
									{genre.name}
								</Button>
							</Cell>
						))}
					</Box>
				))}
			</Box>
		</FeatureLayout>
	);
};

initApp(Popup, true);

const styles: StyleObj = {
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	genresContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 1,
	},
	serviceRow: {
		display: 'flex',
		flexDirection: 'row',
	},
	serviceNameCell: {
		width: 125,
	},
	genreButton: {
		width: 'max-content',
		height: 'max-content',
	},
};
