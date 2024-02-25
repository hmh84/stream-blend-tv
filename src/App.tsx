import { Box, Typography } from '@mui/material';

import { appName } from './data/data';

export default function App() {
	return (
		<Box className='App' sx={{ p: 1 }}>
			<Typography variant='h3' component='h1'>
				{appName} - TV Mode
			</Typography>
		</Box>
	);
}
