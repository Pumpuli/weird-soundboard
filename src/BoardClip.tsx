import React, { forwardRef } from 'react';
import { Clip, ClipState } from './interfaces';
import SoundButton from './SoundButton';
import AudioClip from './AudioPlayer';
import YoutubePlayer from './YoutubePlayer';

export interface Props {
	clip: Clip;
	state: ClipState;
	onClick: () => void;
	onSecondaryClick: () => void;
	onEnd: () => void;
}

export interface Methods {
	play(): void;
	reset(): void;
}

const BoardClip: React.RefForwardingComponent<Methods, Props> = ({ clip, state, onClick, onSecondaryClick, onEnd }, ref) => {
	switch (clip.type) {
		case 'soundfile':
			return (
				<>
					<SoundButton sound={clip} state={state} onClick={onClick} />
					<AudioClip ref={ref} url={clip.url} state={state} onEnd={onEnd} />
				</>
			);

		case 'youtube':
			return (
				<>
					<SoundButton sound={clip} state={state} onClick={onClick} />
					<button type="button" onClick={onSecondaryClick}>reset</button>
					<YoutubePlayer ref={ref} clip={clip} state={state} onEnd={onEnd} />
				</>
			);
	}

	return null;
};

export default forwardRef(BoardClip);
