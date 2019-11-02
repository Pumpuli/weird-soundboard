import React, { useContext, useEffect, useRef } from 'react';
import { SoundContext } from './SoundContext';
import { SoundClip } from './soundboard';

interface Props {
	url: string[];
	state: 'idle' | 'playing';
	onEnd: () => void
}

const Clip: React.FC<Props> = ({ url, state, onEnd }) => {
	const board = useContext(SoundContext);
	const piece = useRef<SoundClip | null>(null);

	const savedOnEnd = useRef<() => void>();

	useEffect(() => {
		savedOnEnd.current = onEnd;
	}, [onEnd]);

	useEffect(() => {
		const pc = board.add(url);
		pc.on('end', () => savedOnEnd.current && savedOnEnd.current());
		piece.current = pc;

		return () => {
			piece.current = null;
			pc.remove();
		};
	}, [url, board]);

	useEffect(() => {
		if (!piece.current) {
			return;
		}

		if (state === 'playing') {
			piece.current.play();
		} else if (state === 'idle') {
			piece.current.stop();
		}
	}, [state]);

	return null;
};

export default Clip;
