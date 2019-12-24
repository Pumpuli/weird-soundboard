import React from 'react';
import { Clip, ClipState } from './interfaces';
import ClipControl from './ClipControl';

const SoundButton: React.FC<{
	sound: Clip;
	state: ClipState;
	onClick: () => void;
}> = ({ sound, state, onClick }) => {
	return (
		<button type="button" className="Sound" onClick={onClick}>
			{sound.name}
			{sound.replayType === 'faf' ? null : <ClipControl state={state} />}
		</button>
	);
};

export default SoundButton;
