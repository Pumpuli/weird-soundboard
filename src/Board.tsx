import React, { useReducer, useRef } from 'react';
import produce from 'immer';
import { Sound, SoundState, Video, VideoState } from './interfaces';
import useEventListener from './useEventListener';
import SoundButton from './SoundButton';
import Clip from './Clip';
import YouTube from 'react-youtube';
import VideoClip from './VideoClip';
import ClipControl from './ClipControl';

interface State {
	soundStates: { [id: string]: SoundState };
	videoStates: { [id: string]: VideoState };
}

type Action =
	| { type: 'PLAY'; id: string }
	| { type: 'STOP'; id: string }
	| { type: 'PLAYVIDEO'; id: string }
	| { type: 'STOPVIDEO'; id: string };

const reducer: (state: State, action: Action) => State = produce(
	(state: State, action: Action) => {
		switch (action.type) {
			case 'PLAY':
				state.soundStates[action.id] = 'playing';
				break;

			case 'STOP':
				state.soundStates[action.id] = 'idle';
				break;

			case 'PLAYVIDEO':
				state.videoStates[action.id] = 'playing';
				break;

			case 'STOPVIDEO':
				state.videoStates[action.id] = 'idle';
				break;
		}
	}
);

const Board: React.FC<{
	sounds: { [id: string]: Sound };
	soundIds: string[];
	keys: { [key: string]: string };
	videos?: { [id: string]: Video };
	videoIds?: string[];
}> = ({ sounds, soundIds, keys, videos = {}, videoIds = [] }) => {
	const [{ soundStates, videoStates }, dispatch] = useReducer(reducer, {
		soundStates: {},
		videoStates: {}
	});

	const refs = useRef(new Map<string, any>()).current;
	const players = useRef(new Map<string, any>()).current;

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
			{videoIds.map(id => {
				const video = videos[id];
				const state = videoStates[id] || 'idle';

				return (
					<div key={id}>
						<button
							className="Sound"
							type="button"
							onClick={() =>
								dispatch(
									state === 'idle'
										? { type: 'PLAYVIDEO', id }
										: { type: 'STOPVIDEO', id }
								)
							}
						>
							{video.name}
							<ClipControl state={state} />
						</button>
						<button
							type="button"
							onClick={() => players.get(id) && players.get(id).reset()}
						>
							reset
						</button>
						<VideoClip
							ref={inst =>
								inst === null ? players.delete(id) : players.set(id, inst)
							}
							video={video}
							state={state}
						/>
					</div>
				);
			})}
		</main>
	);
};

export default Board;
