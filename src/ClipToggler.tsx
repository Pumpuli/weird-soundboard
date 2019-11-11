import React from 'react';
import { Sound, Video } from './interfaces';

interface Props {
	sounds: { [id: string]: Sound };
	soundIds: string[];
	videos: { [id: string]: Video };
	videoIds: string[];
	dispatch: Function;
	onRequestClose?: () => void;
}

const ClipToggler: React.FC<Props> = ({
	sounds,
	soundIds,
	videos,
	videoIds,
	dispatch,
	onRequestClose
}) => {
	return (
		<div
			style={{
				position: 'fixed',
				backgroundColor: '#efefef',
				padding: '1rem',
				display: 'flex'
			}}
		>
			<button type="button" onClick={() => onRequestClose && onRequestClose()}>
				close
			</button>
			{Object.keys(sounds).map(id => {
				const sound = sounds[id];

				return (
					<div
						key={id}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							padding: '1rem'
						}}
					>
						<label htmlFor={`S:${id}`}>{sound.name}</label>
						<input
							id={`S:${id}`}
							type="checkbox"
							defaultChecked={soundIds.includes(id)}
							onChange={event =>
								dispatch(
									event.target.checked
										? { type: 'ENABLE_SOUND', id }
										: { type: 'DISABLE_SOUND', id }
								)
							}
						/>
					</div>
				);
			})}
			{Object.keys(videos).map(id => {
				const video = videos[id];

				return (
					<div
						key={id}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							padding: '1rem'
						}}
					>
						<label htmlFor={`V:${id}`}>{video.name}</label>
						<input
							id={`V:${id}`}
							type="checkbox"
							defaultChecked={videoIds.includes(id)}
							onChange={event =>
								dispatch(
									event.target.checked
										? { type: 'ENABLE_VIDEO', id }
										: { type: 'DISABLE_VIDEO', id }
								)
							}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default ClipToggler;
