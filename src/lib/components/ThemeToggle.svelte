<script lang="ts">
	import { darkMode, toggleTheme } from '$lib/stores/theme';
	import { onDestroy, onMount } from 'svelte';

	import darkModeIcon from '$lib/assets/darkModeIcon.svg';
	import lightModeIcon from '$lib/assets/lightModeIcon.svg';

	const unsubscribe = darkMode.subscribe((value) => ($darkMode = value));
	onDestroy(() => unsubscribe());

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<button class="theme-toggle" onclick={toggleTheme}>
	{#if mounted}
		{#key $darkMode}
			<img
				src={$darkMode ? darkModeIcon : lightModeIcon}
				alt={$darkMode ? 'Dark mode' : 'Light mode'}
				class="icon fade"
			/>
		{/key}
	{/if}
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		padding: 8px;
		cursor: pointer;
		transition:
			background 0.3s,
			transform 0.2s;
	}

	.theme-toggle:hover {
		background: var(--color-primary);
		transform: scale(1.1);
	}

	.theme-toggle .icon {
		width: 24px;
		height: 24px;
	}
	.fade {
		animation: fadeIn 250ms ease forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.85);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	:global(.dark) .theme-toggle .icon {
		filter: invert(1);
	}
</style>
