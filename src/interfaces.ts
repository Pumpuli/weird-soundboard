export type SoundState = 'idle' | 'playing';

export interface Sound {
	id: string;
	channel: string;
	name: string;
	url: string[];
	type?: 'faf';
}
