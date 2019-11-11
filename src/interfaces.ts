export type SoundState = 'idle' | 'playing';

export interface Sound {
	id: string;
	channel: string;
	name: string;
	url: string[];
	type?: 'faf';
}

export type VideoState = 'idle' | 'playing';

export interface Video {
	id: string;
	videoId: string;
	name: string;
	start?: number;
}
