import { Box, SxProps, Theme } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';

import { StyleObj, appName } from '../data/data';

export interface FeatureLayoutProps extends PropsWithChildren<unknown> {
	title: string;
	sx?: SxProps<Theme>;
}

export default function FeatureLayout({
	title,
	sx,
	children,
}: FeatureLayoutProps) {
	return (
		<Box
			className='feature-layout'
			// @ts-ignore
			sx={{
				...styles.featureLayout,
				...sx,
			}}
		>
			<Helmet>
				<title>
					{appName} - {title}
				</title>
			</Helmet>
			{children}
		</Box>
	);
}

const styles: StyleObj = {
	featureLayout: {
		padding: 1,
		bgcolor: '#323232',
		width: '100%',
		minHeight: '100%',
		color: '#fff',
	},
};
