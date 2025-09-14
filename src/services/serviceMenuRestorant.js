const _API_URL = process.env.NEXT_PUBLIC_API_URL
import axios from 'axios';

export const getMenuByRestaurantId = async (id, options = {}) => {
	const queryParams = new URLSearchParams({
		include_unavailable: true,
		...options
	}).toString();

	const res = await fetch(`${_API_URL}/menu/restaurant/${id}?${queryParams}`);
	const data = await res.json();

	if (!res.ok || !data.success) {
		throw new Error(data.message || "Ошибка при получении меню");
	}

	const menuItems = data.data.menu.flatMap((category) => category.items);
	return menuItems;
};

export const getMenuItemById = async (id) => {
	console.log('Fetching item with ID:', id);
	console.log('API URL:', `${_API_URL}/menu/item/${id}`);

	const res = await fetch(`${_API_URL}/menu/item/${id}`);
	const data = await res.json();

	if (!res.ok || !data.success) {
		throw new Error(data.message || "Ошибка при получении блюда");
	}

	// 👈 ИСПРАВЛЕНО: возвращаем конкретно item
	return {
		item: data.data.item,
		similar_items: data.data.similar_items
	};
};






