import React, { useReducer, useState } from 'react';
import produce from 'immer';
import { Sound, Video } from './interfaces';
import Board from './Board';
import './App.css';
import ClipToggler from './ClipToggler';

interface State {
	sounds: {
		[key: string]: Sound;
	};
	soundIds: string[];
	keys: {
		[key: string]: string;
	};
	videos: {
		[key: string]: Video;
	};
	videoIds: string[];
}

type Action =
	| { type: 'ENABLE_SOUND'; id: string }
	| { type: 'DISABLE_SOUND'; id: string }
	| { type: 'ENABLE_VIDEO'; id: string }
	| { type: 'DISABLE_VIDEO'; id: string };

const init = (initialValue: State) => {
	try {
		const item = window.localStorage.getItem('MIX_SOUNDS');

		return item ? { ...initialValue, ...JSON.parse(item) } : initialValue;
	} catch (e) {
		return initialValue;
	}
};

const soundIdSorter = (a: string, b: string) => a.localeCompare(b);
const videoIdSorter = (a: string, b: string) => a.localeCompare(b);

const reducer: (state: State, action: Action) => State = produce(
	(state: State, action: Action) => {
		switch (action.type) {
			case 'ENABLE_SOUND':
				state.soundIds = Array.from(
					new Set(state.soundIds).add(action.id)
				).sort(soundIdSorter);
				break;

			case 'DISABLE_SOUND':
				state.soundIds = state.soundIds.filter(id => id !== action.id);
				break;

			case 'ENABLE_VIDEO':
				state.videoIds = Array.from(
					new Set(state.videoIds).add(action.id)
				).sort(videoIdSorter);
				break;

			case 'DISABLE_VIDEO':
				state.videoIds = state.videoIds.filter(id => id !== action.id);
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
				soundIds: newState.soundIds,
				videoIds: newState.videoIds
			})
		);
	} catch (e) {}

	return newState;
};

const App: React.FC = () => {
	const [{ sounds, soundIds, keys, videos, videoIds }, dispatch] = useReducer(
		middleware,
		{
			sounds: {
				s1: {
					id: 's1',
					channel: 'ch1',
					name: 'Zoom',
					url: [`${process.env.PUBLIC_URL}/sounds/zoom.wav`]
				},
				s2: {
					id: 's2',
					channel: 'ch1',
					name: 'USP',
					url: [`${process.env.PUBLIC_URL}/sounds/usp_silenced.wav`],
					type: 'faf'
				},
				s3: {
					id: 's3',
					channel: 'ch1',
					name: 'Siren',
					url: [`${process.env.PUBLIC_URL}/sounds/police.ogg`]
				},
				s4: {
					id: 's4',
					channel: 'ch1',
					name: 'Quack',
					url: [`${process.env.PUBLIC_URL}/sounds/quack.mp3`],
					type: 'faf'
				}
			},
			soundIds: ['s1', 's2', 's3', 's4'],
			keys: {
				q: 's1',
				w: 's2',
				e: 's3',
				r: 's4'
			},
			videos: {
				v1: {
					id: 'v1',
					videoId: 'Pc6S6Mqr8Oo',
					name: 'Mankka',
					start: 4
				},
				v2: {
					id: 'v2',
					videoId: 'aXgSHL7efKg',
					name: 'Le Freak',
					start: 2
				},
				v3: {
					id: 'v3',
					videoId: 'dQw4w9WgXcQ',
					name: 'Rick Astley'
				}
			},
			videoIds: ['v1', 'v2']
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
			<Board
				sounds={sounds}
				soundIds={soundIds}
				keys={keys}
				videos={videos}
				videoIds={videoIds}
			/>
			<button type="button" onClick={() => setTogglerOpen(v => !v)}>
				conf
			</button>
			{isTogglerOpen ? (
				<ClipToggler
					sounds={sounds}
					soundIds={soundIds}
					videos={videos}
					videoIds={videoIds}
					dispatch={dispatch}
					onRequestClose={() => setTogglerOpen(false)}
				/>
			) : null}
		</div>
	);
};

export default App;
