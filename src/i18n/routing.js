import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
	// Список підтримуваних локалей
	locales: ['ru', 'en'],
	// Локаль за замовчуванням
	defaultLocale: 'ru'
});