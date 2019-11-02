import React, { useReducer, useRef } from 'react';
import produce from 'immer';
import { Sound, SoundState } from './interfaces';
import SoundButton from './SoundButton';
import Clip from './Clip';
import useEventListener from './useEventListener';

interface State {
	soundStates: { [id: string]: SoundState };
}

type Action = { type: 'PLAY'; id: string } | { type: 'STOP'; id: string };

const reducer: (state: State, action: Action) => State = produce(
	(state: State, action: Action) => {
		switch (action.type) {
			case 'PLAY':
				state.soundStates[action.id] = 'playing';
				break;

			case 'STOP':
				state.soundStates[action.id] = 'idle';
				break;
		}
	}
);

const Board: React.FC<{
	sounds: { [id: string]: Sound };
	soundIds: string[];
	keys: { [key: string]: string };
}> = ({ sounds, soundIds, keys }) => {
	const [{ soundStates }, dispatch] = useReducer(reducer, { soundStates: {} });

	const refs = useRef(new Map<string, any>()).current;

	function activate(id: string) {
		const sound = sounds[id];

		if (!sound) {
			return;
		}

		if (sound.type === 'faf') {
			const clip = refs.get(id);

			clip && clip.play();
		} else {
			const state = soundStates[id] || 'idle';

			dispatch(state === 'idle' ? { type: 'PLAY', id } : { type: 'STOP', id });
		}
	}

	useEventListener('keydown', event => {
		if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) {
			return;
		}

		const id = keys[event.key];

		if (!id) {
			return;
		}

		activate(id);

		event.preventDefault();
	});

	return (
		<main className="Sounds">
			{soundIds.map(id => {
				const sound = sounds[id];
				const state = soundStates[id] || 'idle';

				return (
					<React.Fragment key={id}>
						<SoundButton
							sound={sound}
							state={state}
							onClick={() => activate(id)}
						/>
						<Clip
							ref={inst =>
								inst === null ? refs.delete(id) : refs.set(id, inst)
							}
							url={sound.url}
							state={state}
							onEnd={() => dispatch({ type: 'STOP', id })}
						/>
					</React.Fragment>
				);
			})}
		</main>
	);
};

export default Board;
