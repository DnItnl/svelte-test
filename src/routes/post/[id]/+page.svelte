<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { postsService } from '$lib/services/posts.service';
	import type { Post } from '$lib/types/post';
	import type { PageData } from './$types';

	let post: Post | null = null;
	let loading = true;
	let notFound = false;

	export let data: PageData;

	onMount(() => {
		const id = data.id;
		post = postsService.getPostById(id);

		if (!post) {
			notFound = true;
		}

		loading = false;
	});

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('ru-RU', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	function goBack() {
		goto('/post');
	}
	function editPost() {
		if (post) {
			goto(`/post/${post.id}/edit`);
		}
	}
</script>

<div class="container">
	{#if loading}
		<div class="loading">Загрузка...</div>
	{:else if notFound}
		<div class="not-found">
			<h1>Пост не найден</h1>
			<p>К сожалению, запрашиваемый пост не существует.</p>
			<button onclick={goBack}>← Вернуться к списку постов</button>
		</div>
	{:else if post}
		<div class="post-detail">
			<div class="top-buttons">
				<button class="button" onclick={goBack}>← Назад к списку</button>
				<button class="button" onclick={editPost}>Редактировать</button>
			</div>
			<article>
				<h1>{post.title}</h1>

				<div class="post-info">
					<div class="author">
						<span class="label">Автор:</span>
						<span>{post.author}</span>
					</div>
					<div class="dates">
						<div class="date-item">
							<span>Создано:</span>
							<span>{formatDate(post.createdAt)}</span>
						</div>
						<div class="date-item">
							<span>Обновлено:</span>
							<span>{formatDate(post.updatedAt)}</span>
						</div>
					</div>
				</div>

				<div class="content">
					{post.content}
				</div>
			</article>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
		min-height: 100vh;
	}

	.loading {
		text-align: center;
		padding: 4rem 0;
		font-size: 1.25rem;
		color: var(--color-muted);
	}

	.not-found {
		text-align: center;
		padding: 4rem 2rem;
	}

	.not-found h1 {
		font-size: 2rem;
		margin-bottom: 1rem;
		color: var(--color-text);
	}

	.not-found p {
		color: var(--color-muted);
		margin-bottom: 2rem;
	}

	.button {
		margin-bottom: 2rem;
		background: var(--color-surface);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}

	.button:hover {
		background: var(--color-primary);
		color: #ffffff;
	}

	.top-buttons {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	article {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 2rem;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 1.5rem;
		color: var(--color-primary);
		line-height: 1.3;
	}

	.post-info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-bottom: 1.5rem;
		margin-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	.author {
		display: flex;
		gap: 0.5rem;
		color: var(--color-text);
	}

	.label {
		font-weight: 600;
	}

	.dates {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-muted);
	}

	.date-item {
		display: flex;
		gap: 0.5rem;
	}

	.content {
		font-size: 1.125rem;
		line-height: 1.7;
		color: var(--color-text);
		white-space: pre-wrap;
	}

	@media (max-width: 640px) {
		.container {
			padding: 0rem;
			width: 100%;
		}

		article {
			padding: 1.5rem;
		}

		h1 {
			font-size: 1.5rem;
		}

		.content {
			font-size: 1rem;
		}
	}
</style>
