<script lang="ts">
	import KaraokeLyric from '$components/KaraokeLyric.svelte';
	import { lyricsIndexStore } from '$stores/lyricsIndexStore';
	import type { LyricsPronunciation } from '$types/LyricsStructure';

	export let pronunciation: LyricsPronunciation;

	$: currentIndex = $lyricsIndexStore;
	$: pron = pronunciation;
	console.log('KaraokeArea pronunciation:', pron, currentIndex);
</script>

<div id="karaoke-area">
	<!--
	<KaraokeLyric text="Lyrics 0" state="post-exit" />
	<KaraokeLyric text="Lyrics 1" state="exit-end" />
	<KaraokeLyric text="Lyrics 2" state="exit-mid" />
	<KaraokeLyric text="Lyrics 3" state="active" />  => 현재 재생 중인 가사
	<KaraokeLyric text="Lyrics 4" state="enter-mid" />
	<KaraokeLyric text="Lyrics 5" state="enter-start" />
	<KaraokeLyric text="Lyrics 6" state="pre-enter" />
	-->
	{#each pron as text, index}
		<KaraokeLyric
			{text}
			state={index < currentIndex - 2
				? 'post-exit'
				: index === currentIndex - 2
					? 'exit-end'
					: index === currentIndex - 1
						? 'exit-mid'
						: index === currentIndex
							? 'active'
							: index === currentIndex + 1
								? 'enter-mid'
								: index === currentIndex + 2
									? 'enter-start'
									: 'pre-enter'}
		/>
	{/each}
</div>

<style>
	#karaoke-area {
		position: relative;
		width: 100%;
		height: 522px;
	}
</style>
