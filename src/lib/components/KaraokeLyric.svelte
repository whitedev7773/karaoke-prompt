<script lang="ts">
	import type { KaraokeState } from '$types/KaraokeState';
	// import { onDestroy } from 'svelte';

	export let text: string = '';
	export let state: KaraokeState = 'pre-enter';

	/*
	export let index = 0;

	// Simulate state changes for demonstration purposes
	const states: KaraokeState[] = [
		'pre-enter',
		'enter-start',
		'enter-mid',
		'active',
		'exit-mid',
		'exit-end',
		'post-exit'
	];
	const interval = setInterval(() => {
		state = states[index];
		index = (index + 1) % states.length;
	}, 2000);

	onDestroy(() => {
		clearInterval(interval);
	});
    */
</script>

<p class={`${state}`}>{text}</p>

<style>
	:root {
		--duration: 300ms;
		--speed-graph: cubic-bezier(0.4, 0.01, 0.22, 0.98);
		/* --blur-amount: 2px; */
		--blur-amount: 0px;
		/* --opacity-low-1: 0.5;
		--opacity-low-2: 0.3; */
		--opacity-low-1: 1;
		--opacity-low-2: 1;
		--font-weight-unfocus: 400;
		--font-weight-focus: 700;
	}

	p {
		transition:
			font-weight var(--duration) var(--speed-graph),
			opacity var(--duration) var(--speed-graph),
			filter var(--duration) var(--speed-graph),
			transform var(--duration) var(--speed-graph);

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		margin: 0;
		padding: 0;

		width: 100%;

		font-size: 54px;
		font-weight: var(--font-weight-focus);
		color: white;
		text-align: center;

		opacity: 1;
		letter-spacing: -1.5px;
		filter: blur(0px);
	}

	p:global(.pre-enter) {
		opacity: 0;
		font-weight: var(--font-weight-unfocus);
		filter: blur(var(--blur-amount));
		transform: translate(-50%, calc(-50% + 315px));
		/* transform: translateY(325px); */
	}

	p:global(.enter-start) {
		opacity: var(--opacity-low-2);
		font-weight: var(--font-weight-unfocus);
		filter: blur(var(--blur-amount));
		transform: translate(-50%, calc(-50% + 192px));
		/* transform: translateY(222px); */
	}

	p:global(.enter-mid) {
		opacity: var(--opacity-low-1);
		font-weight: var(--font-weight-unfocus);
		filter: blur(var(--blur-amount));
		transform: translate(-50%, calc(-50% + 119px));
		/* transform: translateY(139px); */
	}

	p:global(.active) {
		opacity: 1;
		font-weight: var(--font-weight-focus);
		filter: blur(0px);
		transform: translate(-50%, -50%);
		/* transform: translateY(0px); */
	}

	p:global(.exit-mid) {
		opacity: var(--opacity-low-1);
		font-weight: var(--font-weight-unfocus);
		filter: blur(var(--blur-amount));
		transform: translate(-50%, calc(-50% - 119px));
		/* transform: translateY(-139px); */
	}

	p:global(.exit-end) {
		opacity: var(--opacity-low-2);
		font-weight: var(--font-weight-unfocus);
		filter: blur(var(--blur-amount));
		transform: translate(-50%, calc(-50% - 192px));
		/* transform: translateY(-222px); */
	}

	p:global(.post-exit) {
		opacity: 0;
		font-weight: var(--font-weight-unfocus);
		filter: blur(var(--blur-amount));
		transform: translate(-50%, calc(-50% - 315px));
		/* transform: translateY(-325px); */
	}
</style>
