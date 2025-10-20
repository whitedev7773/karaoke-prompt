import type { LyricsStructure } from '$types/LyricsStructure';
import { InvalidLyricError } from '$errors/InvalidLyricError';

// textarea 예시
/*
원문1
발음1
번역1

원문2
발음2
번역2

...
*/

function checkValidated(value: string): boolean {
	// LyricsStructure 형태로 변환 가능한 올바른 값인지 검사
	const lines = value.trim().split('\n');
	for (let i = 0; i < lines.length; i += 4) {
		if (i + 2 >= lines.length) {
			return false; // 발음과 번역이 없는 경우
		}
		if (lines[i].trim() === '' || lines[i + 1].trim() === '' || lines[i + 2].trim() === '') {
			return false; // 원문, 발음, 번역 중 하나라도 빈 줄인 경우
		}
	}
	return true;
}

export function parseLyrics(value: string): LyricsStructure {
	const blank = '/b';

	value = value.replaceAll(blank, 'ㅤ');

	// 값이 올바른지 검사
	if (!checkValidated(value)) {
		throw new InvalidLyricError('Invalid lyrics format');
	}

	// LyricsStructure 형태로 변환
	const lines = value.trim().split('\n');
	const lyricsStructure: LyricsStructure = [];

	lyricsStructure.push(['ㅤ', 'ㅤ', 'ㅤ']);

	for (let i = 0; i < lines.length; i += 4) {
		const original = lines[i].trim();
		const pronunciation = lines[i + 1].trim();
		const translation = lines[i + 2].trim();
		lyricsStructure.push([original, pronunciation, translation]);
	}

	lyricsStructure.push(['ㅤ', 'ㅤ', 'ㅤ']);

	return lyricsStructure;
}
