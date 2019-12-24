import React from 'react';
import { Clip } from './interfaces';

interface Props {
	clips: { [id: string]: Clip };
	clipIds: string[];
	dispatch: Function;
	onRequestClose?: () => void;
}

const ClipToggler: React.FC<Props> = ({
	clips,
	clipIds,
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
			{Object.keys(clips).map(id => {
				const sound = clips[id];

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
							defaultChecked={clipIds.includes(id)}
							onChange={event =>
								dispatch(
									event.target.checked
										? { type: 'ENABLE_CLIP', id }
										: { type: 'DISABLE_CLIP', id }
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
