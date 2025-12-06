import { browser } from '$app/environment';
import type { Post } from '$lib/types/post';

const STORAGE_KEY = 'posts';
const INITIAL_POSTS: Post[] = [
	{
		id: '1',
		title: 'Почему волки выют и как они общаются',
		content:
			'Вой помогает волкам поддерживать связь на больших расстояниях, обозначать территорию и формировать социальные связи внутри стаи. Исследователи отмечают, что у каждого волка есть уникальный голосовой тембр...',
		author: 'Ирина Лебедева',
		createdAt: new Date('2024-11-10T09:15:00'),
		updatedAt: new Date('2024-11-10T09:15:00')
	},
	{
		id: '2',
		title: 'Как деревья обмениваются информацией под землёй',
		content:
			'Через микоризные сети деревья передают друг другу питательные вещества и химические сигналы. Такая связь помогает лесу действовать как единая экосистема и защищаться от вредителей...',
		author: 'Алексей Гришин',
		createdAt: new Date('2024-11-08T14:30:00'),
		updatedAt: new Date('2024-11-12T11:05:00')
	},
	{
		id: '3',
		title: 'Интеллект осьминогов: что мы знаем',
		content:
			'Осьминоги умеют решать головоломки, запоминать пути и даже открывать банки. Их нервная система распределена по всему телу, что позволяет быстро реагировать на угрозы...',
		author: 'Мария Платонова',
		createdAt: new Date('2024-11-03T18:20:00'),
		updatedAt: new Date('2024-11-06T09:45:00')
	},
	{
		id: '4',
		title: 'Растения, которые чувствуют прикосновения',
		content:
			'Мимоза и венерина мухоловка способны реагировать на физический контакт благодаря электрическим импульсам, проходящим по их клеткам. Это помогает им защищаться от насекомых...',
		author: 'Олег Расторгуев',
		createdAt: new Date('2024-11-11T10:50:00'),
		updatedAt: new Date('2024-11-11T10:50:00')
	},
	{
		id: '5',
		title: 'Как пчёлы находят путь домой',
		content:
			'Пчёлы используют солнечный компас, узнают ландшафт и ориентируются по поляризации света. Их навигация остаётся одной из самых точных среди насекомых...',
		author: 'Владимир Кузнецов',
		createdAt: new Date('2024-11-07T16:40:00'),
		updatedAt: new Date('2024-11-09T08:55:00')
	},
	{
		id: '6',
		title: 'Почему у лягушек бывает яркая окраска',
		content:
			'Яркие цвета служат предупреждением для хищников о наличии сильных токсинов. Особенно опасны древолазы, способные синтезировать смертельно опасные вещества...',
		author: 'Екатерина Боровик',
		createdAt: new Date('2024-11-13T12:05:00'),
		updatedAt: new Date('2024-11-14T15:30:00')
	},
	{
		id: '7',
		title: 'Эхолокация дельфинов: «зрение» с помощью звука',
		content:
			'Дельфины посылают высокочастотные щелчки, а затем анализируют отражённые волны. Это позволяет им находить добычу даже в мутной воде...',
		author: 'Дмитрий Орлов',
		createdAt: new Date('2024-11-02T08:55:00'),
		updatedAt: new Date('2024-11-02T08:55:00')
	},
	{
		id: '8',
		title: 'Загадка массового цветения бамбука',
		content:
			'Некоторые виды бамбука цветут раз в 60–120 лет. После цветения растения погибают, но их семена массово распространяются животными...',
		author: 'Светлана Тарасова',
		createdAt: new Date('2024-11-12T17:20:00'),
		updatedAt: new Date('2024-11-12T17:20:00')
	},
	{
		id: '9',
		title: 'Почему птицы мигрируют ночью',
		content:
			'Ночные перелёты снижают риск перегрева и позволяют использовать стабильные воздушные потоки. Многие виды ориентируются по звёздам...',
		author: 'Роман Чернов',
		createdAt: new Date('2024-11-06T07:25:00'),
		updatedAt: new Date('2024-11-08T10:10:00')
	},
	{
		id: '10',
		title: 'Как хамелеоны меняют цвет',
		content:
			'Иридофоры — специальные клетки кожи — отражают свет разными способами. Благодаря этому хамелеоны могут менять цвет не только для маскировки, но и для общения...',
		author: 'Алина Соколова',
		createdAt: new Date('2024-11-04T11:35:00'),
		updatedAt: new Date('2024-11-04T11:35:00')
	},

	/* ======= Новые 12 элементов ======= */

	{
		id: '11',
		title: 'Как муравьи строят сложные муравейники',
		content:
			'Муравейники работают как естественные системы вентиляции: тоннели регулируют температуру и влажность. Колонии действуют как единый организм благодаря химическим сигналам...',
		author: 'Павел Еремеев',
		createdAt: new Date('2024-11-15T09:40:00'),
		updatedAt: new Date('2024-11-15T09:40:00')
	},
	{
		id: '12',
		title: 'Зачем китам нужны песни',
		content:
			'Горбатые киты поют сложные мелодии, которые могут длиться до 30 минут. Учёные считают, что песни помогают самцам привлекать партнёров и поддерживать связь с другими китами...',
		author: 'Ольга Савченко',
		createdAt: new Date('2024-11-01T13:20:00'),
		updatedAt: new Date('2024-11-03T10:10:00')
	},
	{
		id: '13',
		title: 'Феномен светлячков и их биолюминесценция',
		content:
			'Светлячки создают свет благодаря химической реакции люциферина и фермента люциферазы. Мерцание служит для привлечения партнёров и отпугивания хищников...',
		author: 'Иван Миронов',
		createdAt: new Date('2024-11-19T08:50:00'),
		updatedAt: new Date('2024-11-19T08:50:00')
	},
	{
		id: '14',
		title: 'Как кораллы образуют подводные рифы',
		content:
			'Кораллы — это колонии полипов, которые строят известковые структуры. Рифы становятся домом для тысяч видов рыб и беспозвоночных, формируя одни из самых богатых экосистем...',
		author: 'Елена Горина',
		createdAt: new Date('2024-11-12T15:45:00'),
		updatedAt: new Date('2024-11-12T15:45:00')
	},
	{
		id: '15',
		title: 'Почему медведи впадают в спячку',
		content:
			'Во время спячки обмен веществ медведей сильно замедляется, позволяя переждать холодное время года. Они даже могут сохранять мышечную массу, почти не двигаясь...',
		author: 'Андрей Фёдоров',
		createdAt: new Date('2024-11-06T08:05:00'),
		updatedAt: new Date('2024-11-06T08:05:00')
	},
	{
		id: '16',
		title: 'Как растения «видят» свет',
		content:
			'Фототропизм позволяет растениям тянуться к источнику света. Специальные рецепторы фиксируют его направление и отправляют сигналы для роста стебля...',
		author: 'Зоя Никитина',
		createdAt: new Date('2024-11-17T12:10:00'),
		updatedAt: new Date('2024-11-17T12:10:00')
	},
	{
		id: '17',
		title: 'Миграции бабочек монархов',
		content:
			'Монархи ежегодно пролетает тысячи километров от Канады до Мексики. Их путешествия охватывают несколько поколений, но они неизменно возвращаются в те же места...',
		author: 'Сергей Ложкин',
		createdAt: new Date('2024-11-09T09:55:00'),
		updatedAt: new Date('2024-11-09T09:55:00')
	},
	{
		id: '18',
		title: 'Почему жирафы почти не издают звуков',
		content:
			'Долгое время считалось, что жирафы молчат, но исследования показали: они общаются низкочастотными вибрациями, которые сложно уловить человеческим ухом...',
		author: 'Марина Васильева',
		createdAt: new Date('2024-11-02T18:25:00'),
		updatedAt: new Date('2024-11-05T10:40:00')
	},
	{
		id: '19',
		title: 'Как насекомые используют мимикрию',
		content:
			'Многие бабочки, жуки и богомолы копируют окраску листьев, веток или опасных животных. Такая маскировка помогает избегать хищников...',
		author: 'Оксана Руднева',
		createdAt: new Date('2024-11-20T07:15:00'),
		updatedAt: new Date('2024-11-20T07:15:00')
	},
	{
		id: '20',
		title: 'Секреты жизни глубоководных рыб',
		content:
			'На глубине давление превышает наземное в сотни раз, но рыбы приспособились к таким условиям благодаря гибким костям и уникальным биохимическим процессам...',
		author: 'Георгий Назаров',
		createdAt: new Date('2024-11-14T11:00:00'),
		updatedAt: new Date('2024-11-14T11:00:00')
	},
	{
		id: '21',
		title: 'Почему кактусы почти не теряют воду',
		content:
			'Колючки заменяют листья, уменьшая испарение. Кроме того, стебли кактусов способны накапливать огромное количество влаги в сезон дождей...',
		author: 'Лидия Сафонова',
		createdAt: new Date('2024-11-18T16:30:00'),
		updatedAt: new Date('2024-11-18T16:30:00')
	},
	{
		id: '22',
		title: 'Удивительные способности летучих мышей',
		content:
			'Помимо эхолокации, некоторые виды летучих мышей используют ультрафиолетовый свет и обладают сложными социальными структурами, включающими совместное воспитание детёнышей...',
		author: 'Антон Белкин',
		createdAt: new Date('2024-11-05T13:50:00'),
		updatedAt: new Date('2024-11-05T13:50:00')
	}
];

export type SortBy = 'date-desc' | 'date-asc';

export interface PostFilters {
	searchQuery?: string;
	sortBy?: SortBy;
}

class PostsService {
	getAllPosts(): Post[] {
		if (!browser) {
			return [];
		}
		const stored = localStorage.getItem(STORAGE_KEY);

		if (!stored) {
			this.savePosts(INITIAL_POSTS);
			return INITIAL_POSTS;
		}

		const parsed = JSON.parse(stored);
		return parsed.map((p: Post) => ({
			...p,
			createdAt: new Date(p.createdAt),
			updatedAt: new Date(p.updatedAt)
		}));
	}

	getFilteredPosts(filters: PostFilters = {}): Post[] {
		let posts = this.getAllPosts();

		if (filters.searchQuery) {
			const query = filters.searchQuery.toLowerCase();
			posts = posts.filter(
				(post) =>
					post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query)
			);
		}

		posts = this.sortPosts(posts, filters.sortBy || 'date-desc');

		return posts;
	}
	private sortPosts(posts: Post[], sortBy: SortBy): Post[] {
		return [...posts].sort((a, b) => {
			switch (sortBy) {
				case 'date-desc':
					return b.createdAt.getTime() - a.createdAt.getTime();
				case 'date-asc':
					return a.createdAt.getTime() - b.createdAt.getTime();
				default:
					return 0;
			}
		});
	}
	getPostById(id: string): Post | null {
		const posts = this.getAllPosts();
		return posts.find((p) => p.id === id) || null;
		//тут должен был быть код для получения поста по id с сервера а не перебора всех имеющихся постов с фильтром, я поленился и не стал придумывать эфективное решение
	}

	createPost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post {
		const posts = this.getAllPosts();
		const newPost: Post = {
			...postData,
			id: this.generateId(),
			createdAt: new Date(),
			updatedAt: new Date()
		};

		posts.push(newPost);
		this.savePosts(posts);
		return newPost;
	}

	updatePost(id: string, postData: Partial<Omit<Post, 'id' | 'createdAt'>>): Post | null {
		const posts = this.getAllPosts();
		const index = posts.findIndex((p) => p.id === id);

		if (index === -1) return null;

		posts[index] = {
			...posts[index],
			...postData,
			updatedAt: new Date()
		};

		this.savePosts(posts);
		return posts[index];
	}

	deletePost(id: string): boolean {
		const posts = this.getAllPosts();
		const filtered = posts.filter((p) => p.id !== id);
		if (filtered.length === posts.length) return false;
		this.savePosts(filtered);
		return true;
	}

	private savePosts(posts: Post[]): void {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
	}

	private generateId(): string {
		return crypto.randomUUID();
	}
}

export const postsService = new PostsService();
