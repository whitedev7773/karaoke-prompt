import { writable, get } from 'svelte/store';
import { lyricsStore } from './lyricsStore';

function createLyricsIndexStore() {
	const { set, update, subscribe } = writable<number>(0);

	function modifiedSet(value: number) {
		set(Math.min(get(lyricsStore).length - 1, value));
	}

	return {
		set: modifiedSet,
		subscribe,
		next() {
			update((n) => Math.min(n + 1, get(lyricsStore).length - 1));
		},
		previous() {
			update((n) => Math.max(n - 1, 0));
		},
		clear() {
			set(0);
		}
	};
}

export const lyricsIndexStore = createLyricsIndexStore();
