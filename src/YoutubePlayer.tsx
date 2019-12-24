import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { ClipState, YoutubeClip } from './interfaces';
import YouTube from 'react-youtube';

interface Props {
	clip: YoutubeClip;
	state: ClipState;
	onEnd: () => void;
}

interface Methods {
	reset(): void;
}

const YoutubePlayer: React.RefForwardingComponent<Methods, Props> = ({ clip, state, onEnd }, ref) => {
	const player = useRef<any>(null);

	useEffect(() => {
		if (!player.current) {
			return;
		}

		if (state === 'playing') {
			player.current.playVideo();
		} else if (state === 'idle') {
			player.current.pauseVideo();
		}
	}, [state]);

	useImperativeHandle(ref, () => ({
		reset() {
			player.current && player.current.seekTo(clip.start || 0);
		}
	}));

	return (
		<div className="youtube-player">
			<YouTube
				videoId={clip.videoId}
				opts={{
					playerVars: {
						modestbranding: 1,
						start: clip.start || 0
					}
				}}
				onReady={event => (player.current = event.target)}
				onEnd={onEnd}
			/>
		</div>
	);
};

export default forwardRef(YoutubePlayer);
