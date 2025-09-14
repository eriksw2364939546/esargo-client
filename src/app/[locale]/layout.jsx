import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { Montserrat } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ModalProvider } from '@/components/Modal/Modal';
import { BasketProvider } from '@/services/serviceBasketContext/BasketContext';

// ВАЖЛИВО: Імпортуйте ваші основні стилі
import './globals.css';

const montserrat = Montserrat({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-montserrat',
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
	// КРИТИЧНО: Прелоад тільки основних вагів
	preload: true,
	fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
	const paramsData = await params;
	const locale = paramsData.locale;

	return {
		metadataBase: new URL('https://xxx.com'),
		title: locale === 'ua'
			? 'Брендовані шкарпетки на замовлення від 50 пар | Brandify'
			: 'Custom Branded Socks from 50 pairs | Brandify',
		description: locale === 'ua'
			? 'Brandify виготовляє високоякісні брендовані шкарпетки від 50 пар. Понад 10,000 проектів! Швидке виробництво, доступні ціни.'
			: 'Brandify manufactures high-quality custom branded socks from 50 pairs. Over 10,000 projects! Fast production, affordable prices.',
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		openGraph: {
			type: 'website',
			url: locale === 'ua' ? 'https://xxx.com/ua' : 'https://xxx.com/en',
			title: locale === 'ua'
				? 'Brandify - №1 у виробництві брендованих шкарпеток'
				: 'Brandify - #1 in branded sock manufacturing',
			description: locale === 'ua'
				? 'Понад 10,000 успішних проектів! Швидке виробництво, якісні матеріали.'
				: 'Over 10,000 successful projects! Fast production, quality materials.',
			siteName: 'Brandify',
			locale: locale === 'ua' ? 'uk_UA' : 'en_US',
			images: [
				{
					url: 'https://xxxx.com/seo/og-image.jpg',
					width: 1200,
					height: 630,
					alt: 'Brandify',
					type: 'image/jpeg',
				}
			],
		},
		// КРИТИЧНО: Додаємо alternates для SEO
		alternates: {
			canonical: locale === 'ua' ? 'https://xxxx.com/ua' : 'https://xxxx.com/en',
			languages: {
				'uk': 'https://xxx.com/ua',
				'en': 'https://xxx.com/en',
				'x-default': 'https://xxxx.com/ua'
			},
		},
	};
}

export default async function LocaleLayout({ children, params }) {
	const paramsData = await params;
	const locale = paramsData.locale;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);
	const messages = await getMessages();

	return (
		<html lang={locale === "ua" ? "uk" : "en"}>
			<head>
				{/* КРИТИЧНО: Meta теги для швидкості */}
				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />

				{locale === 'ua' && (
					<>
						<link rel="alternate" href="https://xxx.com/ua" hrefLang="uk" />
						<link rel="alternate" href="https://xxx.com/en" hrefLang="en" />
						<link rel="alternate" href="https://xxx.com/ua" hrefLang="x-default" />
					</>
				)}
				{locale === 'en' && (
					<>
						<link rel="alternate" href="https://xxx.com/ua" hrefLang="uk" />
						<link rel="alternate" href="https://xxx.com/en" hrefLang="en" />
						<link rel="alternate" href="https://xxx.com/ua" hrefLang="x-default" />
					</>
				)}

				{/* КРИТИЧНО: Resource hints для максимальної швидкості */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

				{/* КРИТИЧНО: Прелоадинг ТІЛЬКИ критичних зображень */}
				<link
					rel="preload"
					href="/images/home/hs (1).webp"
					as="image"
					type="image/webp"
					fetchPriority="high"
				/>
				<link
					rel="preload"
					href="/images/home/hs (2).webp"
					as="image"
					type="image/webp"
					fetchPriority="high"
				/>

				{/* КРИТИЧНО: DNS прелоадинг для швидкості */}
				<link rel="dns-prefetch" href="//www.youtube.com" />
				<link rel="dns-prefetch" href="//img.youtube.com" />
				<link rel="dns-prefetch" href="//www.google-analytics.com" />

				{/* Фавіконки - оптимізовані */}
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
				<link rel="manifest" href="/site.webmanifest" />
				<meta name="theme-color" content="#d00000" />
				<meta name="msapplication-TileColor" content="#da532c" />

				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:image" content="https://xxx.com/seo/og-image.jpg" />
				<meta property="og:image:secure_url" content="https://xxx.com/seo/og-image.jpg" />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />

				{/* КРИТИЧНО: Structured Data для швидшої індексації */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Organization",
							"name": "Brandify",
							"url": "https://xxx.com",
							"logo": "https://xxx.com/favicon-32x32.png",
							"description": locale === 'ua'
								? "Виробництво брендованих шкарпеток від 50 пар"
								: "Custom branded socks manufacturing from 50 pairs",
							"contactPoint": {
								"@type": "ContactPoint",
								"contactType": "Customer Service",
								"availableLanguage": ["Ukrainian", "English"]
							}
						})
					}}
				/>
			</head>

			<body className={`${montserrat.variable} antialiased`}>
				{/* КРИТИЧНО: Structured Data для контактів */}

                <NextIntlClientProvider locale={locale} messages={messages}>
                	<BasketProvider>
                		<ModalProvider>
                			{/* КРИТИЧНО: Header з higher priority */}
                			<Header />
                
                			<main className="root" role="main">
                				{children}
                			</main>
                
                			<Footer />
                		</ModalProvider>
                	</BasketProvider>
                </NextIntlClientProvider>

			</body>
		</html>
	);
}