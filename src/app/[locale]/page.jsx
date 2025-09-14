import { routing } from '@/i18n/routing';
import HomePage from '@/pages/HomePage/HomePage';

// Генерація статичних параметрів для локалей
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
	const paramsData = await params;
	const locale = paramsData.locale;

	return {
		title: locale === 'ua'
			? 'Брендовані шкарпетки на замовлення від 50 пар | Brandify'
			: 'Custom Branded Socks from 50 pairs | Brandify',
		description: locale === 'ua'
			? 'Brandify виготовляє високоякісні брендовані шкарпетки від 50 пар. Понад 10,000 проектів! Корпоративні, спортивні, дитячі шкарпетки з індивідуальним дизайном. Швидке виробництво, доступні ціни.'
			: 'Brandify manufactures high-quality custom branded socks from 50 pairs. Over 10,000 projects! Corporate, sports, children\'s socks with individual design. Fast production, affordable prices.',
		keywords: locale === 'ua'
			? 'брендовані шкарпетки, шкарпетки на замовлення, корпоративні шкарпетки, спортивні шкарпетки, дитячі шкарпетки, виробництво шкарпеток, шкарпетки з логотипом, brandify україна, замовити шкарпетки, якісні шкарпетки'
			: 'branded socks, custom socks order, corporate socks, sports socks, children socks, sock manufacturing, logo socks, brandify ukraine, order socks, quality socks',
		openGraph: {
			title: locale === 'ua'
				? 'Brandify - №1 у виробництві брендованих шкарпеток в Україні'
				: 'Brandify - #1 in branded sock manufacturing in Ukraine',
			description: locale === 'ua'
				? 'Понад 10,000 успішних проектів! Виготовляємо брендовані шкарпетки від 50 пар з індивідуальним дизайном.'
				: 'Over 10,000 successful projects! We manufacture branded socks from 50 pairs with individual design.',
			images: [
				{
					url: '/seo/og-image.jpg',
					width: 1200,
					height: 630,
					alt: locale === 'ua'
						? 'Brandify - виробництво брендованих шкарпеток'
						: 'Brandify - branded socks manufacturing',
				},
			],
		},
		twitter: {
			title: locale === 'ua'
				? 'Brandify - №1 у виробництві брендованих шкарпеток'
				: 'Brandify - #1 in branded sock manufacturing',
			description: locale === 'ua'
				? 'Понад 10,000 проектів! Шкарпетки від 50 пар з індивідуальним дизайном'
				: 'Over 10,000 projects! Socks from 50 pairs with individual design',
		},
		alternates: {
			canonical: locale === 'ua' ? '/ua' : '/en',
		},
	};
}

export default function Home() {
	return (
		<HomePage />
	);
}