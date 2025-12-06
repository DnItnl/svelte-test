<script lang="ts">
	import { goto } from '$app/navigation';
	import { postsService } from '$lib/services/posts.service';

	let title = '';
	let content = '';
	let author = '';
	let errors: { title?: string; content?: string; author?: string } = {};
	let submitting = false;

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
			const newPost = postsService.createPost({
				title: title.trim(),
				content: content.trim(),
				author: author.trim()
			});
			await goto(`/post/${newPost.id}`);
		} catch (error) {
			console.error('Ошибка при создании поста:', error);
			alert('Произошла ошибка при создании поста');
		} finally {
			submitting = false;
		}
	}

	function handleCancel() {
		goto('/post');
	}
</script>

<div class="container">
	<div class="form-wrapper">
		<h1>Создать новый пост</h1>

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
				<button type="button" class="btn-secondary" on:click={handleCancel} disabled={submitting}>
					Отмена
				</button>
				<button type="submit" class="btn-primary" disabled={submitting}>
					{submitting ? 'Создание...' : 'Создать пост'}
				</button>
			</div>
		</form>
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
		min-height: 100vh;
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
		justify-content: flex-end;
		margin-top: 2rem;
	}

	.btn-primary,
	.btn-secondary {
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

	.btn-primary:disabled,
	.btn-secondary:disabled {
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
			flex-direction: column-reverse;
		}

		.btn-primary,
		.btn-secondary {
			width: 100%;
		}
	}
</style>
