// Исправленный компонент StoresList.jsx

"use client"

import "./StoresList.scss";
import { useState, useEffect, useMemo, useCallback } from "react";
import StoreCard from "../StoreCard/StoreCard";
import Loader from "../Loader/Loader";
import { useTranslations } from "next-intl";
import { getAllRestaurants } from "@/services/serviceRestorant";

const StoresList = ({ cardsToWatch = "all", initialCardsCount = 8 }) => {
	const [popularItems, setPopularItems] = useState([]);
	const [visibleCards, setVisibleCards] = useState(initialCardsCount);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const tMPL = useTranslations("MostPopularPage");
	const tMPLInfo = useTranslations("MostPopularPage.popularInfo");

	useEffect(() => {
		const fetchPopularItems = async () => {
			try {
				setLoading(true);
				setError("");
				
				console.log('🏪 Fetching popular restaurants...');
				console.log('cardsToWatch:', cardsToWatch);
				
				// ✅ ИСПРАВЛЕНО: Параметры согласно API документации
				const params = { 
					limit: cardsToWatch === "all" ? 100 : parseInt(cardsToWatch),
					sort_by: 'popular', // Вместо 'rating' используем 'popular'
					offset: 0
				};
				
				console.log('📋 API params:', params);
				
				const res = await getAllRestaurants(params);
				
				console.log('📦 API response:', res);
				
				// ✅ ИСПРАВЛЕНО: Проверяем правильную структуру ответа
				if (res && res.success) {
					const restaurants = res.data?.restaurants || [];
					console.log(`✅ Restaurants received: ${restaurants.length}`);
					setPopularItems(restaurants);
					
					// Дополнительная отладочная информация
					if (restaurants.length > 0) {
						console.log('📄 Sample restaurant:', restaurants[0]);
					}
				} else {
					console.error('❌ API response not successful:', res);
					setError(res?.message || "Не удалось загрузить популярные рестораны.");
				}
			} catch (err) {
				console.error("❌ Error fetching popular restaurants:", err);
				setError(err.message || "Произошла ошибка при получении популярных ресторанов.");
			} finally {
				setLoading(false);
			}
		};

		fetchPopularItems();
	}, [cardsToWatch]);

	const itemsToDisplay = useMemo(() => {
		console.log('🔄 Computing itemsToDisplay:', {
			totalItems: popularItems.length,
			cardsToWatch,
			visibleCards
		});
		
		return cardsToWatch === "all"
			? popularItems.slice(0, visibleCards)
			: popularItems.slice(0, parseInt(cardsToWatch));
	}, [popularItems, cardsToWatch, visibleCards]);

	const showMoreItems = useCallback(() => {
		setVisibleCards((prev) => {
			const newCount = prev + 8;
			console.log('➕ Showing more items:', newCount);
			return newCount;
		});
	}, []);

	const hasMoreItems = useMemo(() => {
		return cardsToWatch === "all" && visibleCards < popularItems.length;
	}, [cardsToWatch, visibleCards, popularItems.length]);

	// ✅ ИСПРАВЛЕНО: Функция для получения изображения согласно структуре API
const getRestaurantImage = (restaurant) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    if (restaurant.cover_image_url) {
        // Если путь начинается с /, добавляем базовый URL БЕЗ /api
        if (restaurant.cover_image_url.startsWith('/')) {
            // ✅ ИСПРАВЛЕНО: убираем /api из пути
            return `${baseUrl.replace('/api', '')}${restaurant.cover_image_url}`;
        }
        return restaurant.cover_image_url;
    }
    
    return "/assets/img/company-image.png";
};

	// ✅ ИСПРАВЛЕНО: Функция для получения рейтинга
	const getRestaurantRating = (restaurant) => {
		if (restaurant.rating) {
			return typeof restaurant.rating === 'number' 
				? restaurant.rating.toFixed(1)
				: parseFloat(restaurant.rating).toFixed(1);
		}
		return "4.5"; // Значение по умолчанию
	};

	// ✅ ДОБАВЛЕНО: Функция для получения времени доставки
	const getDeliveryTime = (restaurant) => {
		if (restaurant.delivery_info?.estimated_delivery_time) {
			return `${restaurant.delivery_info.estimated_delivery_time} мин`;
		}
		if (restaurant.estimated_delivery_time) {
			return `${restaurant.estimated_delivery_time} мин`;
		}
		return "25-35 мин"; // Значение по умолчанию
	};

	// ✅ ДОБАВЛЕНО: Функция для получения минимальной суммы заказа
	const getMinOrderAmount = (restaurant) => {
		if (restaurant.delivery_info?.minimum_order) {
			return `от ${restaurant.delivery_info.minimum_order}€`;
		}
		if (restaurant.minimum_order) {
			return `от ${restaurant.minimum_order}€`;
		}
		return "от 15€"; // Значение по умолчанию
	};

	// Отображение состояния загрузки
	if (loading) {
		return (
			<div className="stores-list-loading">
				<Loader />
				<p>Загружаем рестораны...</p>
			</div>
		);
	}

	// Отображение ошибки
	if (error) {
		return (
			<div className="stores-list-error">
				<p className="error-message">{error}</p>
				<button 
					onClick={() => window.location.reload()} 
					className="retry-button"
				>
					Попробовать снова
				</button>
			</div>
		);
	}

	// Отображение пустого списка
	if (popularItems.length === 0) {
		return (
			<div className="stores-list-empty">
				<p>Рестораны не найдены</p>
				<p className="empty-description">
					Попробуйте изменить фильтры или обновить страницу
				</p>
			</div>
		);
	}

	return (
		<div className="stores-list">
			<div className="stores-grid">
				{itemsToDisplay.map((restaurant) => (
					<StoreCard
						key={restaurant._id || restaurant.id}
						id={restaurant._id || restaurant.id}
						// ✅ ИСПРАВЛЕНО: правильные поля после расшифровки
						name={restaurant.name || restaurant.brand_name || restaurant.business_name}
						image={getRestaurantImage(restaurant)}
						rating={getRestaurantRating(restaurant)}
						deliveryTime={getDeliveryTime(restaurant)}
						minOrder={getMinOrderAmount(restaurant)}
						category={restaurant.category}
						cuisine={restaurant.cuisine}
						isOpen={restaurant.is_open || restaurant.is_currently_open}
						// Дополнительные данные для отладки
						restaurant={restaurant}
					/>
				))}
			</div>

			{/* Кнопка "Показать больше" */}
			{hasMoreItems && (
				<div className="load-more-section">
					<button 
						onClick={showMoreItems}
						className="load-more-button"
					>
						{tMPL("showMore")}
					</button>
					<p className="items-info">
						Показано {itemsToDisplay.length} из {popularItems.length}
					</p>
				</div>
			)}

			{/* Отладочная информация (только в development) */}
			{process.env.NODE_ENV === 'development' && (
				<div className="debug-info" style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5' }}>
					<h4>Debug Info:</h4>
					<p>Total restaurants: {popularItems.length}</p>
					<p>Visible cards: {visibleCards}</p>
					<p>Cards to watch: {cardsToWatch}</p>
					<p>Has more items: {hasMoreItems.toString()}</p>
				</div>
			)}
		</div>
	);
};

export default StoresList;