<script lang="ts">
	import { postsService, type SortBy } from '$lib/services/posts.service';
	import type { Post } from '$lib/types/post';
	import { onMount } from 'svelte';

	let filteredPosts: Post[] = [];
	let currentPage = 1;
	const pageSize = 9;

	let searchQuery = '';
	let sortBy: 'createdAt' | 'updatedAt' = 'createdAt';

	$: {
		const sortByMapping: Record<typeof sortBy, SortBy> = {
			createdAt: 'date-desc',
			updatedAt: 'date-desc'
		};

		let posts = postsService.getFilteredPosts({
			searchQuery,
			sortBy: sortByMapping[sortBy]
		});

		if (sortBy === 'updatedAt') {
			posts = [...posts].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
		}

		filteredPosts = posts;
		currentPage = 1;
	}

	// Пагинация
	$: totalPages = Math.ceil(filteredPosts.length / pageSize);
	$: paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	onMount(() => {
		filteredPosts = postsService.getAllPosts();
	});
	function toggleSort() {
		sortBy = sortBy === 'createdAt' ? 'updatedAt' : 'createdAt';
	}

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('ru-RU', {
			dateStyle: 'full'
		}).format(date);
	}

	function nextPage() {
		if (currentPage < totalPages) currentPage++;
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
	}
</script>

<div class="container">
	<h1>Все посты</h1>
	<div class="search-panel">
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Поиск по названию..."
			class="search-input"
		/>

		<button class="sort-btn" onclick={toggleSort}>
			{#if sortBy === 'createdAt'}
				По дате создания
			{:else}
				По дате обновления
			{/if}
		</button>
	</div>
	<div class="posts-grid">
		{#each paginatedPosts as post (post.id)}
			<a href="/post/{post.id}" class="post-card">
				<h2>{post.title}</h2>

				<div class="post-meta">
					<div class="meta-item">
						<span>Создано: {formatDate(post.createdAt)}</span>
					</div>
					<div class="meta-item">
						<span>Обновлено: {formatDate(post.updatedAt)}</span>
					</div>
				</div>
			</a>
		{/each}
	</div>

	{#if totalPages > 1}
		<div class="pagination">
			<button onclick={prevPage} disabled={currentPage === 1}>← Назад</button>

			<span class="page-info">Страница {currentPage} из {totalPages}</span>

			<button onclick={nextPage} disabled={currentPage === totalPages}>Вперед →</button>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.search-panel {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.search-input {
		flex: 1;
		min-width: 250px;
		padding: 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		background: var(--color-surface);
		color: var(--color-text);
		font-size: 1rem;
		box-sizing: border-box;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.sort-btn {
		padding: 0.75rem 1.5rem;
		background: var(--color-surface);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		cursor: pointer;
		font-size: 1rem;
		white-space: nowrap;
		transition: all 0.2s;
	}

	.sort-btn:hover {
		background: var(--color-primary);
		color: #ffffff;
		border-color: var(--color-primary);
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.post-card {
		display: block;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 1.5rem;
		text-decoration: none;
		color: inherit;
		transition: all 0.2s ease;
	}

	.post-card:hover {
		scale: 1.11;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
	}

	.post-card h2 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
		color: var(--color-primary);
	}

	.post-meta {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-muted);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
	}

	.pagination button {
		background: var(--color-primary);
		color: #ffffff;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		cursor: pointer;
	}

	.pagination button:disabled {
		background: var(--color-border);
		color: var(--color-muted);
		cursor: not-allowed;
		opacity: 0.5;
	}

	.pagination button:not(:disabled):hover {
		opacity: 0.9;
	}

	.page-info {
		color: var(--color-muted);
	}

	.no-results {
		grid-column: 1 / -1;
		text-align: center;
		padding: 3rem 1rem;
	}

	.no-results p {
		font-size: 1.25rem;
		color: var(--color-muted);
	}

	@media (max-width: 640px) {
		.container {
			padding: 0rem;
			width: 100%;
		}
		.search-panel {
			flex-direction: column;
		}

		.search-input {
			min-width: 100%;
		}

		.sort-btn {
			width: 100%;
		}
	}
</style>
