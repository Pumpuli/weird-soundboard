import React from 'react';
import { Sound } from './interfaces';
import SoundButton from './SoundButton';
import Clip from './Clip';

const SoundEntry: React.FC<{ sound: Sound; dispatch: Function }> = ({
	sound,
	dispatch
}) => (
	<>
		<SoundButton
			sound={sound}
			onClick={() =>
				dispatch(
					sound.state === 'idle'
						? { type: 'PLAY', id: sound.id }
						: { type: 'STOP', id: sound.id }
				)
			}
		/>
		<Clip
			url={sound.url}
			state={sound.state}
			onEnd={() => dispatch({ type: 'STOP', id: sound.id })}
		/>
	</>
);

export default SoundEntry;
