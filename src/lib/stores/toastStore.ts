import { writable } from 'svelte/store';
import type { Toast, ToastOptions } from '$types/Toast';

function uid() {
	return Math.random().toString(36).slice(2, 9);
}

function createToastStore() {
	const { subscribe, update, set } = writable<Toast[]>([]);

	return {
		subscribe,
		update,
		set,
		/**
		 * push a toast.
		 */
		push(opts: ToastOptions) {
			const id = opts.id ?? uid();
			const duration = opts.duration ?? 4000;
			const toast: Toast = {
				id,
				title: opts.title,
				message: opts.message,
				type: opts.type ?? 'info',
				duration,
				createdAt: Date.now(),
				remaining: duration
			};
			update((ts) => [toast, ...ts]); // newest on top
			return id;
		},
		/**
		 * remove by id
		 */
		remove(id: string) {
			update((ts) => ts.filter((t) => t.id !== id));
		},
		/**
		 * clear all
		 */
		clear() {
			set([]);
		},
		/**
		 * update the 'remaining' for a toast (used when pausing)
		 */
		setRemaining(id: string, remaining: number) {
			update((ts) => ts.map((t) => (t.id === id ? { ...t, remaining } : t)));
		}
	};
}

export const toastStore = createToastStore();
