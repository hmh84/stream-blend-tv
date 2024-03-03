import { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/system';
import { PropsWithChildren } from 'react';
import { StyleObj } from '../../data/data';

export interface CellProps extends PropsWithChildren<unknown> {
	sx?: SxProps<Theme>;
}

export default function Cell({ sx, children }: CellProps) {
	return (
		<Box
			// @ts-ignore
			sx={{
				...styles.cell,
				...sx,
			}}
		>
			{children}
		</Box>
	);
}

const styles: StyleObj = {
	cell: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		borderColor: '#fff',
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 0,
		color: '#fff',
	},
};
