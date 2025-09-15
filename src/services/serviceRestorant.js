// serviceRestorant.js - ПОЛНАЯ ИСПРАВЛЕННАЯ ВЕРСИЯ СО ВСЕМИ ФУНКЦИЯМИ

const _API_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔍 ОТЛАДОЧНАЯ ИНФОРМАЦИЯ
console.log('=== API URL DEBUG ===');
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('Expected format: http://localhost:5000/api');
console.log('====================');

if (!_API_URL) {
	console.error('❌ NEXT_PUBLIC_API_URL не настроена!');
	console.log('Добавьте в .env.local: NEXT_PUBLIC_API_URL=http://localhost:5000/api');
}

// ✅ ОТЛАДОЧНАЯ ФУНКЦИЯ для проверки URL
export const debugApiUrl = () => {
	console.log('=== API DEBUG INFO ===');
	console.log('Current API URL:', _API_URL);
	console.log('Expected catalog URL:', `${_API_URL}/public/catalog`);
	console.log('Expected restaurant URL:', `${_API_URL}/public/restaurants/[id]`);
	console.log('======================');
};

// ✅ ТЕСТОВАЯ ФУНКЦИЯ для проверки подключения
export const testApiConnection = async () => {
	try {
		console.log('🔗 Testing API connection...');
		const testUrl = `${_API_URL}/public/catalog?limit=1`;
		console.log('Test URL:', testUrl);
		
		const response = await fetch(testUrl);
		console.log('Test response status:', response.status);
		
		if (response.ok) {
			const data = await response.json();
			console.log('✅ API connection successful!');
			return { success: true, data };
		} else {
			console.error('❌ API connection failed:', response.status);
			const errorText = await response.text();
			console.error('Error response:', errorText);
			return { success: false, status: response.status, error: errorText };
		}
	} catch (error) {
		console.error('❌ API connection error:', error);
		return { success: false, error: error.message };
	}
};

// ✅ ОТЛАДОЧНАЯ ФУНКЦИЯ из оригинального кода
export const debugRestaurantRequest = async (id) => {
	console.log('=== DEBUG RESTAURANT REQUEST ===');
	console.log('Input ID:', id);
	console.log('API_URL:', _API_URL);
	console.log('Is ObjectId format:', /^[0-9a-fA-F]{24}$/.test(id));
	
	if (!_API_URL) {
		console.error('API_URL is not defined!');
		return { error: 'API_URL not configured' };
	}
	
	try {
		// ✅ ИСПРАВЛЕНО: убрано дублирование /api
		const url = `${_API_URL}/public/restaurants/${id}?include_menu=false`;
		console.log('Full URL:', url);
		
		const response = await fetch(url, {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		});
		
		console.log('Response status:', response.status);
		console.log('Response ok:', response.ok);
		console.log('Response headers:', Object.fromEntries(response.headers.entries()));
		
		const text = await response.text();
		console.log('Raw response length:', text.length);
		console.log('Raw response first 500 chars:', text.substring(0, 500));
		
		if (!response.ok) {
			console.error('HTTP Error:', response.status, response.statusText);
			return { error: `HTTP ${response.status}: ${response.statusText}`, raw: text };
		}
		
		try {
			const json = JSON.parse(text);
			console.log('Parsed JSON success:', !!json.success);
			console.log('Restaurant found:', !!json.data?.restaurant);
			return json;
		} catch (parseError) {
			console.error('JSON parse error:', parseError);
			return { error: 'Invalid JSON response', raw: text };
		}
	} catch (error) {
		console.error('Fetch error:', error);
		return { error: error.message };
	}
};

// ✅ ИСПРАВЛЕННАЯ ФУНКЦИЯ: Получить ресторан по ID (с поддержкой поиска)
export const getRestaurantById = async (id, includeMenu = true) => {
	try {
		if (!_API_URL) {
			console.error('API URL не настроен. Проверьте переменную окружения NEXT_PUBLIC_API_URL');
			throw new Error('API URL не настроен. Проверьте .env');
		}

		console.log('Fetching restaurant with ID:', id);

		// Проверяем, является ли id MongoDB ObjectId (24 символа hex)
		const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
		console.log('Is valid ObjectId:', isObjectId);

		let url;
		let response;
		let data;

		if (isObjectId) {
			// Если это ObjectId, используем прямой запрос
			// ✅ ИСПРАВЛЕНО: убрано дублирование /api
			url = `${_API_URL}/public/restaurants/${id}?include_menu=${includeMenu}`;
			console.log('Request URL (ObjectId):', url);

			response = await fetch(url, {
				method: 'GET',
				headers: { 
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
			});

			console.log('Response status:', response.status);
			console.log('Response ok:', response.ok);
			console.log('Response statusText:', response.statusText);

			if (!response.ok) {
				const errorText = await response.text();
				console.error('API Error Response Text:', errorText);
				
				try {
					const error = JSON.parse(errorText);
					console.error('API Error JSON:', error);
					throw new Error(error.message || `Ресторан с ID "${id}" не найден (${response.status})`);
				} catch (parseError) {
					console.error('Failed to parse error response:', parseError);
					throw new Error(`Ресторан с ID "${id}" не найден (${response.status}). Raw response: ${errorText.substring(0, 200)}`);
				}
			}

			const responseText = await response.text();
			console.log('Success response text length:', responseText.length);
			
			try {
				data = JSON.parse(responseText);
				console.log('Parsed response data:', data);
			} catch (parseError) {
				console.error('Failed to parse success response:', parseError);
				console.error('Response text:', responseText.substring(0, 500));
				throw new Error('Неверный формат ответа от сервера');
			}

			return data;
		} else {
			// Если это не ObjectId, используем поиск
			console.log('Using search for non-ObjectId:', id);
			// ✅ ИСПРАВЛЕНО: правильный путь для поиска
			url = `${_API_URL}/public/search?q=${encodeURIComponent(id)}`;
			console.log('Request URL (Search):', url);

			response = await fetch(url, {
				method: 'GET',
				headers: { 
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
			});

			if (!response.ok) {
				const error = await response.json().catch(() => ({}));
				console.error('API Error:', error);
				throw new Error(error.message || `Ресторан с ID "${id}" не найден (${response.status})`);
			}

			data = await response.json();
			console.log('Search response data:', data);

			// Ищем точное совпадение в результатах поиска
			if (data.success && data.data && data.data.restaurants && data.data.restaurants.length > 0) {
				const exactMatch = data.data.restaurants.find(restaurant => 
					restaurant.id_name === id || 
					restaurant._id === id ||
					restaurant.name.toLowerCase() === id.toLowerCase()
				);

				if (exactMatch) {
					// Возвращаем в том же формате, что и прямой запрос
					return {
						success: true,
						data: { restaurant: exactMatch }
					};
				} else {
					// Если точного совпадения нет, берем первый результат
					return {
						success: true,
						data: { restaurant: data.data.restaurants[0] }
					};
				}
			} else {
				throw new Error(`Ресторан с ID "${id}" не найден`);
			}
		}
	} catch (error) {
		console.error('Ошибка при получении ресторана:', error);
		console.error('Error stack:', error.stack);
		
		// Более подробная информация об ошибке
		if (error.name === 'TypeError' && error.message.includes('fetch')) {
			throw new Error('Не удается подключиться к серверу. Проверьте интернет-соединение и настройки API.');
		}
		
		throw error;
	}
};

// ✅ ИСПРАВЛЕННАЯ ФУНКЦИЯ: Получить все рестораны
export const getAllRestaurants = async (params = {}) => {
	try {
		if (!_API_URL) {
			console.error('API URL не настроен. Проверьте переменную окружения NEXT_PUBLIC_API_URL');
			throw new Error('API URL не настроен. Проверьте .env');
		}

		const queryParams = new URLSearchParams();

		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				queryParams.append(key, value);
			}
		});

		// ✅ ИСПРАВЛЕНО: убрано дублирование /api
		const url = `${_API_URL}/public/catalog${queryParams.toString() ? `?${queryParams}` : ''}`;
		console.log('Fetching restaurants from:', url);

		const response = await fetch(url, {
			method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		});

		console.log('getAllRestaurants response status:', response.status);

		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			console.error('getAllRestaurants API Error:', error);
			throw new Error(error.message || `Ошибка при получении списка ресторанов (${response.status})`);
		}

		const data = await response.json();
		console.log('getAllRestaurants response data:', data);

		// ✅ Преобразуем в формат, который ожидает фронтенд
		return {
			success: data.result || false,
			data: {
				restaurants: data.data || [],
				pagination: data.pagination || {},
				total_found: data.total_found || 0
			},
			message: data.message
		};
	} catch (error) {
		console.error('Ошибка при получении ресторанов:', error);
		
		// Более подробная информация об ошибке
		if (error.name === 'TypeError' && error.message.includes('fetch')) {
			throw new Error('Не удается подключиться к серверу. Проверьте интернет-соединение и настройки API.');
		}
		
		throw error;
	}
};

// ✅ ИСПРАВЛЕННАЯ ФУНКЦИЯ: Поиск ресторанов по запросу
export const searchRestaurants = async (query, params = {}) => {
	try {
		if (!_API_URL) {
			throw new Error('API URL не настроен');
		}

		const queryParams = new URLSearchParams({ q: query });

		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				queryParams.append(key, value);
			}
		});

		// ✅ ИСПРАВЛЕНО: правильный путь для поиска
		const response = await fetch(`${_API_URL}/public/search?${queryParams}`);

		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			throw new Error(error.message || 'Ошибка при поиске ресторанов');
		}

		return await response.json();
	} catch (error) {
		console.error('Ошибка при поиске ресторанов:', error);
		throw error;
	}
};

// ✅ ИСПРАВЛЕННАЯ ФУНКЦИЯ: Получить рестораны по почтовому индексу
export const getRestaurantsByPostalCode = async (postalCode, params = {}) => {
	try {
		if (!_API_URL) {
			throw new Error('API URL не настроен');
		}

		const queryParams = new URLSearchParams();

		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				queryParams.append(key, value);
			}
		});

		// ✅ ИСПРАВЛЕНО: убрано дублирование /api (если такой endpoint существует)
		const url = `${_API_URL}/public/restaurants/by-postal-code/${postalCode}${queryParams.toString() ? `?${queryParams}` : ''}`;
		const response = await fetch(url);

		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			throw new Error(error.message || 'Ошибка при получении ресторанов по индексу');
		}

		return await response.json();
	} catch (error) {
		console.error('Ошибка при получении ресторанов по индексу:', error);
		throw error;
	}
};

// ✅ ИСПРАВЛЕННАЯ ФУНКЦИЯ: Получить меню по ID ресторана
export const getMenuByRestaurantId = async (id, options = {}) => {
	try {
		if (!_API_URL) {
			throw new Error('API URL не настроен');
		}

		const queryParams = new URLSearchParams({
			include_unavailable: true,
			...options
		}).toString();

		// ✅ ИСПРАВЛЕНО: правильный путь для меню
		const res = await fetch(`${_API_URL}/public/restaurants/${id}/menu?${queryParams}`);
		const data = await res.json();

		if (!res.ok || !data.success) {
			throw new Error(data.message || "Ошибка при получении меню");
		}

		// Извлекаем items из категорий меню
		const menuItems = data.data?.menu?.flatMap((category) => category.items) || [];
		return menuItems;
	} catch (error) {
		console.error('Ошибка при получении меню:', error);
		throw error;
	}
};

// ✅ ИСПРАВЛЕННАЯ ФУНКЦИЯ: Получить блюдо по ID
export const getMenuItemById = async (id) => {
	try {
		if (!_API_URL) {
			throw new Error('API URL не настроен');
		}

		console.log('Fetching item with ID:', id);
		// ✅ ИСПРАВЛЕНО: правильный путь для получения блюда
		const url = `${_API_URL}/public/menu/item/${id}`;
		console.log('API URL:', url);

		const res = await fetch(url);
		const data = await res.json();

		if (!res.ok || !data.success) {
			throw new Error(data.message || "Ошибка при получении блюда");
		}

		return {
			item: data.data.item,
			similar_items: data.data.similar_items
		};
	} catch (error) {
		console.error('Ошибка при получении блюда:', error);
		throw error;
	}
};