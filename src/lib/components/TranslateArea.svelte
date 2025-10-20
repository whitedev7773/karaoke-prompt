<script lang="ts">
	import TranslateLyric from '$components/TranslateLyric.svelte';
	import { lyricsIndexStore } from '$stores/lyricsIndexStore';
	import type { LyricsTranslation } from '$types/LyricsStructure';

	export let translated: LyricsTranslation;

	$: currentIndex = $lyricsIndexStore;
	$: trans = translated;
	console.log('Translated:', trans, currentIndex);
</script>

<div id="translate-area">
	<!-- Translate Area Content -->
	<!-- <TranslateLyric jp="こんにちは" kr="안녕하세요" state="show" /> -->
	{#each trans as text, index}
		<TranslateLyric jp={text[0]} kr={text[1]} state={index === currentIndex ? 'show' : 'hide'} />
	{/each}
</div>

<style>
	#translate-area {
		position: relative;

		width: 100%;
		height: 65px;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		opacity: 0.4;
	}
</style>
