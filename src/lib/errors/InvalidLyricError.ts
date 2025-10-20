// 잘못된 가사를 입력한 오류
export class InvalidLyricError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidLyricError';
	}
}
