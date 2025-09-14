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
				
				console.log('Fetching popular restaurants...');
				console.log('cardsToWatch:', cardsToWatch);
				
				// Получаем все рестораны с API
				const params = { 
					limit: cardsToWatch === "all" ? 100 : parseInt(cardsToWatch),
					sort: 'rating',
					order: 'desc'
				};
				
				console.log('API params:', params);
				
				const res = await getAllRestaurants(params);
				
				console.log('API response:', res);
				
				if (res && res.success) {
					const restaurants = res.data?.restaurants || [];
					console.log('Restaurants received:', restaurants.length);
					setPopularItems(restaurants);
				} else {
					console.error('API response not successful:', res);
					setError(res?.message || "Не удалось загрузить популярные рестораны.");
				}
			} catch (err) {
				console.error("Error fetching popular restaurants:", err);
				setError(err.message || "Произошла ошибка при получении популярных ресторанов.");
			} finally {
				setLoading(false);
			}
		};

		fetchPopularItems();
	}, [cardsToWatch]);

	const itemsToDisplay = useMemo(() => {
		console.log('Computing itemsToDisplay:', {
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
			console.log('Showing more items:', newCount);
			return newCount;
		});
	}, []);

	const hasMoreItems = useMemo(() => {
		return cardsToWatch === "all" && visibleCards < popularItems.length;
	}, [cardsToWatch, visibleCards, popularItems.length]);

	// Функция для получения изображения
	const getRestaurantImage = (restaurant) => {
		return restaurant.image || restaurant.logo || "/assets/img/company-image.png";
	};

	// Функция для получения рейтинга
	const getRestaurantRating = (restaurant) => {
		if (restaurant.rating) {
			return typeof restaurant.rating === 'number' 
				? restaurant.rating.toString() 
				: restaurant.rating.toString();
		}
		return "4.5"; // значение по умолчанию
	};

	// Функция для получения времени доставки
	const getDeliveryTime = (restaurant) => {
		if (restaurant.delivery_time) {
			return typeof restaurant.delivery_time === 'number'
				? restaurant.delivery_time.toString()
				: restaurant.delivery_time.toString();
		}
		return "25-35"; // значение по умолчанию
	};

	// Функция для получения стоимости доставки
	const getDeliveryFee = (restaurant) => {
		if (restaurant.delivery_fee !== undefined && restaurant.delivery_fee !== null) {
			return typeof restaurant.delivery_fee === 'number'
				? restaurant.delivery_fee.toString()
				: restaurant.delivery_fee.toString();
		}
		return "2.99"; // значение по умолчанию
	};

	if (loading) {
		return (
			<div className="loader-wrapper__popular">
				<Loader />
			</div>
		);
	}

	if (error) {
		return (
			<div className="error-wrapper">
				<p style={{ color: "red" }}>{error}</p>
				<button onClick={() => window.location.reload()} className="btn">
					Попробовать снова
				</button>
			</div>
		);
	}

	if (popularItems.length === 0) {
		return (
			<div className="no-restaurants">
				<p>Популярные рестораны не найдены</p>
			</div>
		);
	}

	console.log('Rendering items:', itemsToDisplay.length);

	return (
		<>
			<div className="most-popular__list">
				{itemsToDisplay.map((item) => {
					console.log('Rendering restaurant:', {
						id: item._id,
						name: item.name,
						rating: item.rating
					});
					
					return (
						<StoreCard
							key={item._id}
							id={item._id}
							image={getRestaurantImage(item)}
							title={item.name}
							rating={getRestaurantRating(item)}
							time={getDeliveryTime(item)}
							shippingCost={getDeliveryFee(item)}
						/>
					);
				})}
			</div>

			{hasMoreItems && (
				<button className="popular__show-btn btn" onClick={showMoreItems}>
					{tMPL("btn")}
				</button>
			)}

			{cardsToWatch === "all" && (
				<div className="popular__info">
					{tMPLInfo("text1")} {itemsToDisplay.length} {tMPLInfo("text2")} {popularItems.length} {tMPLInfo("text3")}
				</div>
			)}
		</>
	);
};

export default StoresList;