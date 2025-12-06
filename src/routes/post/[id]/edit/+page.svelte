<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { postsService } from '$lib/services/posts.service';
	import type { PageData } from './$types';
	import type { Post } from '$lib/types/post';

	export let data: PageData;

	let post: Post | null = null;
	let title = '';
	let content = '';
	let author = '';
	let errors: { title?: string; content?: string; author?: string } = {};
	let submitting = false;
	let loading = true;
	let notFound = false;

	onMount(() => {
		post = postsService.getPostById(data.id);

		if (!post) {
			notFound = true;
			loading = false;
			return;
		}
		title = post.title;
		content = post.content;
		author = post.author;
		loading = false;
	});

	function validate() {
		errors = {};

		if (!title.trim()) {
			errors.title = 'Название обязательно';
		}

		if (!content.trim()) {
			errors.content = 'Содержание обязательно';
		}

		if (!author.trim()) {
			errors.author = 'Автор обязателен';
		}

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit() {
		if (!validate()) return;

		submitting = true;

		try {
			const updated = postsService.updatePost(data.id, {
				title: title.trim(),
				content: content.trim(),
				author: author.trim()
			});

			if (updated) {
				await goto(`/post/${data.id}`);
			} else {
				alert('Не удалось обновить пост');
			}
		} catch (error) {
			console.error('Ошибка при обновлении поста:', error);
			alert('Произошла ошибка при обновлении поста');
		} finally {
			submitting = false;
		}
	}

	function handleCancel() {
		goto(`/post/${data.id}`);
	}

	async function handleDelete() {
		if (!confirm('Вы уверены, что хотите удалить этот пост?')) {
			return;
		}

		try {
			const deleted = postsService.deletePost(data.id);

			if (deleted) {
				await goto('/post');
			} else {
				alert('Не удалось удалить пост');
			}
		} catch (error) {
			console.error('Ошибка при удалении поста:', error);
			alert('Произошла ошибка при удалении поста');
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
			<button on:click={() => goto('/post')}>← Вернуться к списку постов</button>
		</div>
	{:else}
		<div class="form-wrapper">
			<h1>Редактировать пост</h1>

			<form on:submit|preventDefault={handleSubmit}>
				<div class="form-group">
					<label for="title">Название <span class="required">*</span></label>
					<input
						id="title"
						type="text"
						bind:value={title}
						placeholder="Введите название поста"
						class:error={errors.title}
						disabled={submitting}
					/>
					{#if errors.title}
						<span class="error-message">{errors.title}</span>
					{/if}
				</div>

				<div class="form-group">
					<label for="author">Автор <span class="required">*</span></label>
					<input
						id="author"
						type="text"
						bind:value={author}
						placeholder="Введите имя автора"
						class:error={errors.author}
						disabled={submitting}
					/>
					{#if errors.author}
						<span class="error-message">{errors.author}</span>
					{/if}
				</div>

				<div class="form-group">
					<label for="content">Содержание <span class="required">*</span></label>
					<textarea
						id="content"
						bind:value={content}
						placeholder="Введите содержание поста"
						rows="10"
						class:error={errors.content}
						disabled={submitting}
					/>
					{#if errors.content}
						<span class="error-message">{errors.content}</span>
					{/if}
				</div>

				<div class="form-actions">
					<button type="button" class="btn-danger" on:click={handleDelete} disabled={submitting}>
						Удалить
					</button>
					<div class="actions-right">
						<button
							type="button"
							class="btn-secondary"
							on:click={handleCancel}
							disabled={submitting}
						>
							Отмена
						</button>
						<button type="submit" class="btn-primary" disabled={submitting}>
							{submitting ? 'Сохранение...' : 'Сохранить изменения'}
						</button>
					</div>
				</div>
			</form>
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
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 8px;
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

	.form-wrapper {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 2rem;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 2rem;
		color: var(--color-text);
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: var(--color-text);
	}

	.required {
		color: var(--color-primary);
	}

	input,
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		background: var(--color-bg);
		color: var(--color-text);
		font-family: inherit;
		font-size: 1rem;
		transition: border-color 0.2s;
		box-sizing: border-box;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	input.error,
	textarea.error {
		border-color: #ef4444;
	}

	input:disabled,
	textarea:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	textarea {
		resize: vertical;
		min-height: 200px;
	}

	.error-message {
		display: block;
		margin-top: 0.25rem;
		font-size: 0.875rem;
		color: #ef4444;
	}

	.form-actions {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
		margin-top: 2rem;
	}

	.actions-right {
		display: flex;
		gap: 1rem;
	}

	.btn-primary,
	.btn-secondary,
	.btn-danger {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 6px;
		font-size: 1rem;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.btn-primary {
		background: var(--color-primary);
		color: #ffffff;
	}

	.btn-primary:hover:not(:disabled) {
		opacity: 0.9;
	}

	.btn-secondary {
		background: var(--color-surface);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}

	.btn-secondary:hover:not(:disabled) {
		background: var(--color-bg);
	}

	.btn-danger {
		background: #ef4444;
		color: #ffffff;
	}

	.btn-danger:hover:not(:disabled) {
		opacity: 0.9;
	}

	.btn-primary:disabled,
	.btn-secondary:disabled,
	.btn-danger:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 640px) {
		.container {
			padding: 0rem;
			width: 100%;
		}

		.form-wrapper {
			padding: 1.5rem;
		}

		h1 {
			font-size: 1.5rem;
		}

		.form-actions {
			flex-direction: column;
			align-items: stretch;
		}

		.actions-right {
			flex-direction: column-reverse;
		}

		.btn-primary,
		.btn-secondary,
		.btn-danger {
			width: 100%;
		}
	}
</style>
