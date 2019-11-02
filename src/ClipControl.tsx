import React from 'react';

function getPath(state: 'idle' | 'playing'): string {
	switch (state) {
		case 'idle':
			return 'M -10 -10 L 10 0 L -10 10 Z';
		case 'playing':
			return 'M -10 -10 h 20 v 20 h -20 z';
	}
}

const ClipControl: React.FC<{
	state: 'idle' | 'playing';
	width?: number;
	height?: number;
}> = ({ state, width = 20, height = 20 }) => {
	return (
		<svg viewBox="-10 -10 20 20" width={width} height={height}>
			<path d={getPath(state)} fill="#000" stroke="none" />
		</svg>
	);
};

export default ClipControl;
