import { Box, Typography } from '@mui/material';

import { appName } from '../data/data';
import initApp from '../index';

function Player() {
	return (
		<Box sx={{ p: 1 }}>
			<Typography variant='h3' component='h1'>
				{appName} - Player
			</Typography>
		</Box>
	);
}

initApp(Player);
