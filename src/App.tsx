import React, { useReducer } from 'react';
import produce from 'immer';
import './App.css';
import useEventListener from './useEventListener';
import { Sound } from './interfaces';
import SoundEntry from './SoundEntry';

interface State {
	sounds: {
		[key: string]: Sound;
	};
	soundIds: string[];
	keys: {
		[key: string]: string;
	};
}

type Action = {
	type: 'PLAY' | 'STOP';
	id: string;
};

const reducer: (state: State, action: Action) => State = produce(
	(state: State, action: Action) => {
		switch (action.type) {
			case 'PLAY':
				state.sounds[action.id].state = 'playing';
				break;

			case 'STOP':
				state.sounds[action.id].state = 'idle';
				break;

			default:
				throw new Error(`Uh oh, ${action.type} was not handled.`);
		}
	}
);

const App: React.FC = () => {
	const [{ sounds, soundIds, keys }, dispatch] = useReducer(reducer, {
		sounds: {
			s1: {
				id: 's1',
				channel: 'ch1',
				name: 'Pisla',
				url: [`${process.env.PUBLIC_URL}/sounds/zoom.wav`],
				state: 'idle'
			},
			s2: {
				id: 's2',
				channel: 'ch1',
				name: 'Räjähdys',
				url: [`${process.env.PUBLIC_URL}/sounds/usp_silenced.wav`],
				state: 'idle'
			},
			s3: {
				id: 's3',
				channel: 'ch1',
				name: 'Siren',
				url: [`${process.env.PUBLIC_URL}/sounds/police.ogg`],
				state: 'idle'
			}
		},
		soundIds: ['s1', 's2', 's3'],
		keys: {
			q: 's1',
			w: 's2',
			e: 's3'
		}
	});

	// const [channels, setChannels] = useState([
	// 	{ id: 'ch1', name: 'main' },
	// 	{ id: 'ch2', name: 'background' }
	// ]);

	useEventListener('keydown', event => {
		if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) {
			return;
		}

		const id = keys[event.key];

		if (!id) {
			return;
		}

		const sound = sounds[id];

		dispatch(
			sound.state === 'idle' ? { type: 'PLAY', id } : { type: 'STOP', id }
		);

		event.preventDefault();
	});

	return (
		<div className="App">
			<main className="Sounds">
				{soundIds.map((id: string) => (
					<SoundEntry key={id} sound={sounds[id]} dispatch={dispatch} />
				))}
			</main>
		</div>
	);
};

export default App;
