<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/theme.css';
	import { initTheme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();
	let title = 'Svelte Task Application';

	onMount(() => {
		initTheme();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{title}</title>
</svelte:head>

<div class="layout">
	<header>
		<h1>My Svelte Blog</h1>
		<nav>
			<a href="/wellcome">Главная</a>
			<span class="separator">|</span>
			<a href="/post">Все посты</a>
			<span class="separator">|</span>
			<a href="/post/new">Новый пост</a>
			<div id="theme-toggle"><ThemeToggle /></div>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<p>© {new Date().getFullYear()} My Svelte Blog</p>
	</footer>
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: var(--color-bg);
	}

	header {
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		padding: 0.6rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	header h1 {
		font-size: 1.5rem;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	nav a {
		color: var(--color-muted);
		font-weight: 500;
		white-space: nowrap;
	}

	nav a:hover {
		color: var(--color-primary);
	}

	.separator {
		color: var(--color-muted);
	}

	main {
		flex: 1;
		padding: 2rem;
	}

	footer {
		background: var(--color-surface);
		border-top: 1px solid var(--color-border);
		padding: 1rem 0;
		text-align: center;
		color: var(--color-muted);
		margin-top: auto;
	}
	@media (max-width: 768px) {
		header {
			padding: 0.75rem 1rem;
			gap: 0.75rem;
		}

		header h1 {
			font-size: 1.1rem;
		}

		nav {
			width: 100%;
			justify-content: space-between;
			font-size: 0.85rem;
			gap: 0.5rem;
		}

		.separator {
			display: none;
		}
	}
	@media (max-width: 480px) {
		header h1 {
			font-size: 1rem;
		}

		nav {
			font-size: 0.8rem;
		}

		nav a {
			white-space: nowrap;
		}
	}
</style>
