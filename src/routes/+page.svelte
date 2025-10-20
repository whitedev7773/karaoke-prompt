<script lang="ts">
	import { onMount } from 'svelte';

	import LyricsInput from '$components/LyricsInput.svelte';
	import LyricsBox from '$components/LyricsBox.svelte';

	import { lyricsStore } from '$stores/lyricsStore';
	import { lyricsIndexStore } from '$stores/lyricsIndexStore';
	import { parseLyrics } from '$utils/parseLyrics';

	onMount(() => {
		// 초기 가사 설정 (예시)
		const initialLyrics = '원문1\npronunciation1\n번역1\n\n원문2\npronunciation2\n번역2';
		lyricsStore.set(parseLyrics(initialLyrics));
	});
</script>

<LyricsInput />
<LyricsBox />

<button onclick={lyricsIndexStore.clear}>Reset Index</button>
<button
	onclick={() => {
		lyricsIndexStore.set(Number.MAX_SAFE_INTEGER);
	}}>Go End</button
>
<button onclick={lyricsIndexStore.previous}>Previous</button>
<button onclick={lyricsIndexStore.next}>Next</button>
