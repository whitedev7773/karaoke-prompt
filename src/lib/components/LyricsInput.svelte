<script lang="ts">
	import { toastStore } from '$stores/toastStore';
	import { lyricsStore } from '$stores/lyricsStore';
	import { parseLyrics } from '$utils/parseLyrics';

	// textarea
	let textarea: HTMLTextAreaElement;

	const applyLyrics = () => {
		const lyrics = textarea.value;
		try {
			const result = parseLyrics(lyrics);
			lyricsStore.set(result);
			// console.log($lyricsStore);
			textarea.value = '';
			toastStore.push({
				title: '가사 적용 성공',
				message: '가사가 성공적으로 적용되었습니다.',
				type: 'success'
			});
		} catch (error) {
			console.error(error);
			toastStore.push({
				title: '가사 적용 실패',
				message: '도움말을 참고하여 올바른 형식으로 입력해주세요.',
				type: 'error'
			});
			return;
		}
	};
</script>

<textarea bind:this={textarea} id="lyrics-input" placeholder="여기에 가사 입력"></textarea>
<button onclick={applyLyrics}>적용하기</button>
