<script lang="ts">
	import type { TranslateState } from '$types/TranslateState';

	export let jp: string;
	export let kr: string;
	export let state: TranslateState = 'hide';
</script>

<div id="translate-lyric">
	<p class={`${state}`}>{jp}</p>
	<p class={`${state}`}>{kr}</p>
</div>

<style>
	#translate-lyric {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		width: fit-content;
		height: fit-content;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 3px;
	}

	p {
		transition: opacity 250ms linear;

		margin: 0;
		padding: 0;

		font-size: 26px;
		font-weight: 400;
		color: white;
	}

	p:global(.show) {
		transition: opacity 250ms linear 200ms;
		opacity: 1;
	}

	p:global(.hide) {
		opacity: 0;
	}
</style>
