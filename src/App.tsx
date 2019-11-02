import React, { useReducer } from 'react';
import produce from 'immer';
import { Sound } from './interfaces';
import Board from './Board';
import './App.css';

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
	type: 'DUMMY';
};

const reducer: (state: State, action: Action) => State = produce(
	(state: State, action: Action) => {
		switch (action.type) {
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
				url: [`${process.env.PUBLIC_URL}/sounds/zoom.wav`]
			},
			s2: {
				id: 's2',
				channel: 'ch1',
				name: 'Räjähdys',
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
		}
	});

	// const [channels, setChannels] = useState([
	// 	{ id: 'ch1', name: 'main' },
	// 	{ id: 'ch2', name: 'background' }
	// ]);

	return (
		<div className="App">
			<Board sounds={sounds} soundIds={soundIds} keys={keys} />
		</div>
	);
};

export default App;
