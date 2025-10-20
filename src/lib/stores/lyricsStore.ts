import { writable } from 'svelte/store';
import { lyricsIndexStore } from './lyricsIndexStore';
import type { LyricsStructure } from '$types/LyricsStructure';

function createLyricsStore() {
	const { set, subscribe } = writable<LyricsStructure>([]);

	function modifiedSet(value: LyricsStructure) {
		set(value);
		lyricsIndexStore.clear();
	}

	return {
		set: modifiedSet,
		subscribe,
		clear() {
			set([]);
			lyricsIndexStore.clear();
		}
	};
}

export const lyricsStore = createLyricsStore();
