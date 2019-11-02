import { useRef, useEffect } from 'react';

export default function useEventListener<
	K extends keyof GlobalEventHandlersEventMap
>(
	eventName: K,
	handler: (event: GlobalEventHandlersEventMap[K]) => void,
	element: EventTarget = window
): void {
	const savedHandler = useRef<EventListener>();

	useEffect(() => {
		savedHandler.current = handler as EventListener;
	}, [handler]);

	useEffect(() => {
		const isSupported = element && element.addEventListener;

		if (!isSupported) {
			return;
		}

		const eventListener = (event: Event) =>
			savedHandler.current && savedHandler.current(event);

		element.addEventListener(eventName, eventListener);

		return () => {
			element.removeEventListener(eventName, eventListener);
		};
	}, [eventName, element]);
}
