export type ClipState = 'idle' | 'playing';

export interface ClipBase {
	id: string;
	channel: string;
	name: string;
	replayType?: 'faf';
}

export interface SoundfileClip extends ClipBase {
	type: 'soundfile';
	url: string[];
}

export interface YoutubeClip extends ClipBase {
	type: 'youtube';
	videoId: string;
	start?: number;
}

export type Clip = SoundfileClip | YoutubeClip;
