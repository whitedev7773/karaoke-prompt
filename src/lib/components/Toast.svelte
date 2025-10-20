<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { onDestroy } from 'svelte';
	import { tick } from 'svelte';

	import { toastStore } from '$lib/stores/toastStore';
	import type { Toast } from '$types/Toast';

	let toasts: Toast[];
	const unsub = toastStore.subscribe((v: Toast[]) => (toasts = v));
	onDestroy(unsub);

	// map of timers for auto-dismiss
	const timers = new Map<string, { timerId?: number; startAt?: number }>();

	function startTimer(t: Toast) {
		// don't start if duration=0 (sticky)
		if (t.duration === 0) return;

		// clear existing
		clearTimer(t.id);

		const start = Date.now();
		timers.set(t.id, { startAt: start });

		const id = window.setTimeout(() => {
			toastStore.remove(t.id);
			timers.delete(t.id);
		}, t.remaining);

		const rec = timers.get(t.id);
		if (rec) rec.timerId = id;
	}

	function clearTimer(id: string) {
		const rec = timers.get(id);
		if (rec?.timerId) {
			clearTimeout(rec.timerId);
			rec.timerId = undefined;
		}
	}

	function pauseToast(t: Toast) {
		const rec = timers.get(t.id);
		if (!rec) return;
		clearTimer(t.id);
		if (rec.startAt) {
			const elapsed = Date.now() - rec.startAt;
			const newRemaining = Math.max(0, t.remaining - elapsed);
			toastStore.setRemaining(t.id, newRemaining);
		}
	}

	function resumeToast(t: Toast) {
		// small tick to ensure store update propagated before starting timer
		tick().then(() => {
			// refresh t from $toasts
			const fresh = toasts.find((x) => x.id === t.id);
			if (!fresh) return;
			startTimer(fresh);
		});
	}

	// When a toast is newly added, start timer
	// Watch $toasts length changes and start timers for those without timer
	$: {
		// ensure timers exist for every toast with duration > 0
		for (const t of toasts) {
			if (t.duration > 0 && !timers.has(t.id)) {
				startTimer(t);
			}
		}
		// clean timers for removed toasts
		for (const key of Array.from(timers.keys())) {
			if (!toasts.find((t) => t.id === key)) {
				const rec = timers.get(key);
				if (rec?.timerId) clearTimeout(rec.timerId);
				timers.delete(key);
			}
		}
	}

	function close(id: string) {
		toastStore.remove(id);
	}

	// small helper for CSS classes
	function clsForType(type: Toast['type']) {
		return `toast-${type}`;
	}
</script>

<div class="toast-container" aria-live="polite" aria-atomic="false" role="status">
	{#each toasts as toast (toast.id)}
		<div
			class="toast {clsForType(toast.type)}"
			role="alert"
			on:mouseenter={() => pauseToast(toast)}
			on:mouseleave={() => resumeToast(toast)}
			in:fly={{ x: 20, duration: 220 }}
			out:fade={{ duration: 160 }}
		>
			<div class="icon" aria-hidden="true">
				{#if toast.type === 'success'}✓{/if}
				{#if toast.type === 'error'}✕{/if}
				{#if toast.type === 'info'}i{/if}
				{#if toast.type === 'warning'}!{/if}
			</div>
			<div class="content">
				{#if toast.title}
					<div class="title">{toast.title}</div>
				{/if}
				<div class="message">{toast.message}</div>
				<span class="sr-only">{toast.type} notification</span>
			</div>
			<button class="close" aria-label="Close notification" on:click={() => close(toast.id)}
				>✕</button
			>
		</div>
	{/each}
</div>

<style>
	/* container */
	.toast-container {
		position: fixed;
		top: 20px;
		right: 20px;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-width: 400px;
		pointer-events: none; /* allow clicks to go through container but not items */
	}

	.toast {
		pointer-events: auto; /* but items accept pointer events */
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
		border-radius: 16px;
		padding: 16px 16px;
		display: flex;
		gap: 0.6rem;
		align-items: flex-start;
		background: white;
		min-width: 400px;
		overflow: hidden;
		border-left: 4px solid transparent;
	}

	.toast .content {
		flex: 1 1 auto;
	}

	.toast .title {
		font-weight: 600;
		font-size: 0.95rem;
	}

	.toast .message {
		font-size: 0.9rem;
		margin-top: 0.18rem;
		line-height: 1.2;
		color: #111827;
	}

	.toast .close {
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 0.25rem;
		border-radius: 6px;
		font-size: 0.9rem;
	}

	/* types */
	.toast-info {
		border-left-color: #3b82f6;
	}
	.toast-success {
		border-left-color: #16a34a;
	}
	.toast-warning {
		border-left-color: #f59e0b;
	}
	.toast-error {
		border-left-color: #ef4444;
	}

	/* small visuals */
	.icon {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		background: rgba(0, 0, 0, 0.04);
		flex: 0 0 36px;
		font-size: 0.95rem;
	}

	.sr-only {
		position: absolute !important;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
