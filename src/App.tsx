import React, { useReducer, useState } from 'react';
import produce from 'immer';
import { Clip } from './interfaces';
import Board from './Board';
import './App.css';
import ClipToggler from './ClipToggler';
import Modal from 'react-modal';

interface State {
	clips: {
		[key: string]: Clip;
	};
	clipIds: string[];
	keys: {
		[key: string]: string;
	};
}

type Action =
	| { type: 'ENABLE_CLIP'; id: string }
	| { type: 'DISABLE_CLIP'; id: string };

const init = (initialValue: State) => {
	try {
		const item = window.localStorage.getItem('MIX_SOUNDS');

		return item ? { ...initialValue, ...JSON.parse(item) } : initialValue;
	} catch (e) {
		return initialValue;
	}
};

const clipIdSorter = (a: string, b: string) => a.localeCompare(b);

const reducer: (state: State, action: Action) => State = produce(
	(state: State, action: Action) => {
		switch (action.type) {
			case 'ENABLE_CLIP':
				state.clipIds = Array.from(new Set(state.clipIds).add(action.id)).sort(
					clipIdSorter
				);
				break;

			case 'DISABLE_CLIP':
				state.clipIds = state.clipIds.filter(id => id !== action.id);
				break;

			// default:
			// 	throw new Error(`Uh oh, ${action.type} was not handled.`);
		}
	}
);

const middleware: (state: State, action: Action) => State = (state, action) => {
	const newState = reducer(state, action);

	try {
		window.localStorage.setItem(
			'MIX_SOUNDS',
			JSON.stringify({
				clipIds: newState.clipIds
			})
		);
	} catch (e) {}

	return newState;
};

const App: React.FC = () => {
	const [{ clips, clipIds, keys }, dispatch] = useReducer(
		middleware,
		{
			clips: {
				s1: {
					id: 's1',
					channel: 'ch1',
					name: 'Zoom',
					type: 'soundfile',
					url: [`${process.env.PUBLIC_URL}/sounds/zoom.wav`]
				},
				s2: {
					id: 's2',
					channel: 'ch1',
					name: 'USP',
					type: 'soundfile',
					url: [`${process.env.PUBLIC_URL}/sounds/usp_silenced.wav`],
					replayType: 'faf'
				},
				s3: {
					id: 's3',
					channel: 'ch1',
					name: 'Siren',
					type: 'soundfile',
					url: [`${process.env.PUBLIC_URL}/sounds/police.ogg`]
				},
				s4: {
					id: 's4',
					channel: 'ch1',
					name: 'Quack',
					type: 'soundfile',
					url: [`${process.env.PUBLIC_URL}/sounds/quack.mp3`],
					replayType: 'faf'
				},
				s5: {
					id: 's5',
					channel: 'ch1',
					name: 'Horse',
					type: 'soundfile',
					url: [`${process.env.PUBLIC_URL}/sounds/animal_horse.ogg`]
				},
				s6: {
					id: 's6',
					channel: 'ch1',
					name: 'Bear',
					type: 'soundfile',
					url: [`${process.env.PUBLIC_URL}/sounds/animal_bear.ogg`]
				},
				v1: {
					id: 'v1',
					channel: 'ch1',
					name: 'Mankka',
					type: 'youtube',
					videoId: 'Pc6S6Mqr8Oo',
					start: 4
				},
				v2: {
					id: 'v2',
					channel: 'ch1',
					name: 'Le Freak',
					type: 'youtube',
					videoId: 'aXgSHL7efKg',
					start: 2
				},
				v3: {
					id: 'v3',
					channel: 'ch1',
					name: 'Rick Astley',
					type: 'youtube',
					videoId: 'dQw4w9WgXcQ'
				},
				v4: {
					id: 'v4',
					channel: 'ch1',
					name: 'In the Beginning',
					type: 'youtube',
					videoId: '0ePKY2hC4lQ'
				}
			},
			clipIds: ['s1', 's2', 's3', 's4', 's5', 's6', 'v1', 'v2', 'v3', 'v4'],
			keys: {
				q: 's1',
				w: 's2',
				e: 's3',
				r: 's4',
				t: 's5',
				y: 's6',
				a: 'v1',
				s: 'v2',
				d: 'v3',
				f: 'v4'
			}
		},
		init
	);

	const [isTogglerOpen, setTogglerOpen] = useState(false);

	// const [channels, setChannels] = useState([
	// 	{ id: 'ch1', name: 'main' },
	// 	{ id: 'ch2', name: 'background' }
	// ]);

	return (
		<div className="App">
			<Board clips={clips} clipIds={clipIds} keys={keys} />
			<button type="button" onClick={() => setTogglerOpen(v => !v)}>
				conf
			</button>
			<Modal
				isOpen={isTogglerOpen}
				onRequestClose={() => setTogglerOpen(false)}
			>
				<ClipToggler
					clips={clips}
					clipIds={clipIds}
					dispatch={dispatch}
					onRequestClose={() => setTogglerOpen(false)}
				/>
			</Modal>
		</div>
	);
};

export default App;
