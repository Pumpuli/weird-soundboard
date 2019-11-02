import React from 'react';
import { Sound } from './interfaces';
import ClipControl from './ClipControl';

const SoundButton: React.FC<{ sound: Sound; onClick: () => void }> = ({
	sound,
	onClick
}) => {
	return (
		<button type="button" className="Sound" onClick={onClick}>
			{sound.name}
			<ClipControl state={sound.state} />
		</button>
	);
};

export default SoundButton;
