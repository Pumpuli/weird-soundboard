import React, { useReducer, useRef } from 'react';
import produce from 'immer';
import { Clip, ClipState } from './interfaces';
import useEventListener from './useEventListener';
import BoardClip from './BoardClip';

interface State {
	clipStates: { [id: string]: ClipState };
}

type Action = { type: 'PLAY'; id: string } | { type: 'STOP'; id: string };

const reducer: (state: State, action: Action) => State = produce(
	(state: State, action: Action) => {
		switch (action.type) {
			case 'PLAY':
				state.clipStates[action.id] = 'playing';
				break;

			case 'STOP':
				state.clipStates[action.id] = 'idle';
				break;
		}
	}
);

const Board: React.FC<{
	clips: { [id: string]: Clip };
	clipIds: string[];
	keys: { [key: string]: string };
}> = ({ clips, clipIds, keys = {} }) => {
	const [{ clipStates }, dispatch] = useReducer(reducer, {
		clipStates: {}
	});

	const refs = useRef(new Map<string, any>()).current;

	function activate(id: string) {
		const clip = clips[id];

		if (!clip) {
			return;
		}

		if (clip.type === 'soundfile' && clip.replayType === 'faf') {
			refs.get(id)?.play();
		} else {
			const state = clipStates[id] || 'idle';
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
			{clipIds.map(id => {
				const clip = clips[id];
				const state = clipStates[id] || 'idle';

				return (
					<BoardClip
						key={id}
						ref={inst => (inst === null ? refs.delete(id) : refs.set(id, inst))}
						clip={clip}
						state={state}
						onClick={() => activate(id)}
						onSecondaryClick={() => refs.get(id)?.reset?.()}
						onEnd={() => dispatch({ type: 'STOP', id })}
					/>
				);
			})}
		</main>
	);
};

export default Board;
