// serviceMenuRestorant.js - ИСПРАВЛЕННАЯ ВЕРСИЯ

const _API_URL = process.env.NEXT_PUBLIC_API_URL;
import axios from 'axios';

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

		// ✅ ИСПРАВЛЕНО: убрано дублирование /api
		const url = `${_API_URL}/public/restaurants/${id}/menu?${queryParams}`;
		console.log('🍽️ Fetching menu from:', url);

		const res = await fetch(url);
		const data = await res.json();

		console.log('Menu response status:', res.status);
		console.log('Menu response data:', data);

		if (!res.ok || !data.success) {
			throw new Error(data.message || "Ошибка при получении меню");
		}

		// Извлекаем items из категорий меню
		const menuItems = data.data?.menu?.flatMap((category) => category.items) || [];
		console.log('Menu items extracted:', menuItems.length);
		return menuItems;
	} catch (error) {
		console.error('❌ Ошибка при получении меню:', error);
		throw error;
	}
};

// ✅ ИСПРАВЛЕННАЯ ФУНКЦИЯ: Получить блюдо по ID
export const getMenuItemById = async (id) => {
	try {
		if (!_API_URL) {
			throw new Error('API URL не настроен');
		}

		console.log('🍕 Fetching item with ID:', id);
		
		// ✅ ИСПРАВЛЕНО: убрано дублирование /api
		const url = `${_API_URL}/public/menu/item/${id}`;
		console.log('Menu item URL:', url);

		const res = await fetch(url);
		const data = await res.json();

		console.log('Menu item response status:', res.status);
		console.log('Menu item response data:', data);

		if (!res.ok || !data.success) {
			throw new Error(data.message || "Ошибка при получении блюда");
		}

		// 👈 ОРИГИНАЛЬНЫЙ КОД: возвращаем конкретно item и similar_items
		return {
			item: data.data.item,
			similar_items: data.data.similar_items
		};
	} catch (error) {
		console.error('❌ Ошибка при получении блюда:', error);
		throw error;
	}
};