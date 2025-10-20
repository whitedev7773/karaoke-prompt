export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
	id?: string;
	title?: string;
	message: string;
	type?: ToastType;
	duration?: number; // ms, 0 = sticky
}

export interface Toast
	extends Required<Pick<ToastOptions, 'id' | 'message' | 'type' | 'duration'>> {
	title?: string;
	// internal fields to track pause/resume
	createdAt: number;
	remaining: number;
}
