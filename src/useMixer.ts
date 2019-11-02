import { useRef, useEffect } from "react";
import { Howl } from 'howler';

export interface Sound {
	id: string;
	channel: string;
	name: string;
	url: string[];
}

export function useMixer(sounds: Sound[]) {
	sounds = sounds.slice();
	const howls = useRef<{ config: Sound, howl: Howl }[]>([]);

	useEffect(() => {
		howls.current = howls.current.filter(({ config }) => {
			const inputIndex = sounds.findIndex(input => input.id === config.id);

			if (inputIndex === -1) {
				return false;
			} else {
				sounds.splice(inputIndex, 1);
				return true;
			}
		});

		sounds.forEach(sound => {
			howls.current.push({
				config: sound,
				howl: new Howl({ src: sound.url })
			});
		});
	}, [sounds]);
}
