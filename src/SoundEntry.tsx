import React from 'react';
import { Sound, SoundState } from './interfaces';
import SoundButton from './SoundButton';
import Clip from './Clip';

const SoundEntry: React.FC<{
	sound: Sound;
	state: SoundState;
	dispatch: Function;
}> = ({ sound, state, dispatch }) => (
	<>
		<SoundButton
			sound={sound}
			state={state}
			onClick={() =>
				dispatch(
					state === 'idle'
						? { type: 'PLAY', id: sound.id }
						: { type: 'STOP', id: sound.id }
				)
			}
		/>
		<Clip
			url={sound.url}
			state={state}
			onEnd={() => dispatch({ type: 'STOP', id: sound.id })}
		/>
	</>
);

export default SoundEntry;
