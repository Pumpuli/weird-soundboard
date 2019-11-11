import { useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);

			return item ? (JSON.parse(item) as T) : initialValue;
		} catch (e) {
			return initialValue;
		}
	});

	const setValue = (value: T | ((v: T) => T)) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;

			setStoredValue(valueToStore);

			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (e) {}
	};

	return [storedValue, setValue];
}
