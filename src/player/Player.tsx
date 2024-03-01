import { Box, Typography } from '@mui/material';

import { appName } from '../data/data';

export default function Player() {
	return (
		<Box sx={{ p: 1 }}>
			<Typography variant='h3' component='h1'>
				{appName} - Player
			</Typography>
		</Box>
	);
}
