import React from 'react';
import { Sound, SoundState } from './interfaces';
import ClipControl from './ClipControl';

const SoundButton: React.FC<{
	sound: Sound;
	state: SoundState;
	onClick: () => void;
}> = ({ sound, state, onClick }) => {
	return (
		<button type="button" className="Sound" onClick={onClick}>
			{sound.name}
			{sound.type === 'faf' ? null : <ClipControl state={state} />}
		</button>
	);
};

export default SoundButton;
