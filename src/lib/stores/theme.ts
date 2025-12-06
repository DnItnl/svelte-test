import { writable } from 'svelte/store';

export const darkMode = writable(false);

export function toggleTheme() {
	darkMode.update((current) => {
		const newMode = !current;
		localStorage.setItem('darkMode', newMode ? '1' : '0');
		document.documentElement.classList.toggle('dark', newMode);
		return newMode;
	});
}

export function initTheme() {
	if (typeof window !== 'undefined') {
		const storedTheme = localStorage.getItem('darkMode') === '1';
		darkMode.set(storedTheme);
		document.documentElement.classList.toggle('dark', storedTheme);
	}
}
