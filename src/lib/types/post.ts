import type { Paginated } from './pagination';

export interface Post {
	id: string;
	title: string;
	content: string;
	author: string;
	createdAt: Date;
	updatedAt: Date;
}

export type PaginatedPosts = Paginated<Post>;
