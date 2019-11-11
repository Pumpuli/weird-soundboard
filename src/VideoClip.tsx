import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Video, VideoState } from './interfaces';
import YouTube from 'react-youtube';

interface Props {
	video: Video;
	state: VideoState;
}

const VideoClip: React.FC<Props> = ({ video, state }, ref) => {
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
			player.current && player.current.seekTo(video.start || 0);
		}
	}));

	return (
		<div className="youtube-player">
			<YouTube
				videoId={video.videoId}
				opts={{
					playerVars: {
						modestbranding: 1,
						start: video.start || 0
					}
				}}
				onReady={event => (player.current = event.target)}
			/>
		</div>
	);
};

export default forwardRef(VideoClip);
