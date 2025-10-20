<script lang="ts">
	import KaraokeArea from '$components/KaraokeArea.svelte';
	import TranslateArea from '$components/TranslateArea.svelte';

	import { lyricsStore } from '$stores/lyricsStore';

	// Reactively subscribe to the store, providing a default empty array to prevent errors.
	$: lyrics = $lyricsStore || [];

	// Reactively derive pronunciation and translated from lyrics.
	// This code will automatically run whenever 'lyrics' changes.
	$: pronunciation = lyrics.map(([_, pron, __]) => pron);
	$: translated = lyrics
		.map(([orig, _, trans]) => (orig !== undefined && trans !== undefined ? [orig, trans] : null))
		.filter((item): item is [string, string] => Array.isArray(item));
</script>

<div id="box">
	<KaraokeArea {pronunciation} />
	<TranslateArea {translated} />
</div>

<style>
	div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		/* padding-top: 130px; */

		width: 1760px;
		height: 800px;
		border-top: 2px solid white;
		border-bottom: 2px solid white;
		/* border-radius: 60px; */

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 70px;
	}
</style>
