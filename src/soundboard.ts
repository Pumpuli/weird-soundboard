import { Howl } from 'howler';
import { EventEmitter } from 'events';

export class SoundClip extends EventEmitter {
	private howl: Howl;

	public constructor(private board: SoundBoard, url: string[]) {
		super();

		this.howl = new Howl({ src: url, onend: () => this.emit('end') });
	}

	public remove(): void {
		this.board.remove(this);
	}

	public play(): void {
		this.howl.play();
	}

	public stop(): void {
		this.howl.stop();
	}
}

export class SoundBoard {
	private all = new Set<SoundClip>();

	public add(url: string[]) {
		const instance = new SoundClip(this, url);

		this.all.add(instance);

		return instance;
	}

	public remove(instance: SoundClip) {
		this.all.delete(instance);
	}
}
