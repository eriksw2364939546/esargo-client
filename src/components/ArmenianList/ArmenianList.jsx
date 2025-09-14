"use client"

import "./ArmenianList.scss";
import { useState, useEffect, useMemo, useCallback } from "react";
import StoreCard from "../StoreCard/StoreCard";
import Loader from "../Loader/Loader";
import { useTranslations } from "next-intl";

const ArmenianList = ({ cardsToWatch = "all", initialCardsCount = 8 }) => {
	const [armenianItems, setArmenianItems] = useState([]);
	const [visibleCards, setVisibleCards] = useState(initialCardsCount);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const tA = useTranslations("armenianPage")
	const tAInfo = useTranslations("armenianPage.armenianInfo")

	useEffect(() => {
		const fetchArmenianItems = async () => {
			try {
				// Временная заглушка, имитируем fetch
				await new Promise(resolve => setTimeout(resolve, 1000));
				
				// Временные данные для демонстрации
				const mockData = Array.from({ length: 20 }, (_, index) => ({
					_id: `armenian-item-${index + 1}`,
					name: `Армянский товар ${index + 1}`,
					rating: (4.0 + Math.random() * 1).toFixed(1),
					deliveryTime: Math.floor(Math.random() * 30) + 15,
					shippingCost: Math.floor(Math.random() * 10) + 3
				}));

				setArmenianItems(mockData);
			} catch (err) {
				setError(err.message || "Произошла ошибка при получении армянских товаров.");
			} finally {
				setLoading(false);
			}
		};

		fetchArmenianItems();
	}, []);

	const itemsToDisplay = useMemo(() => {
		return cardsToWatch === "all"
			? armenianItems.slice(0, visibleCards)
			: armenianItems.slice(0, cardsToWatch);
	}, [armenianItems, cardsToWatch, visibleCards]);

	const showMoreItems = useCallback(() => {
		setVisibleCards((prev) => prev + 8);
	}, []);

	const hasMoreItems = useMemo(() => {
		return cardsToWatch === "all" && visibleCards < armenianItems.length;
	}, [cardsToWatch, visibleCards, armenianItems.length]);

	if (loading) {
		return (
			<div className="loader-wrapper__armenian">
				<Loader />
			</div>
		);
	}

	if (error) {
		return <p style={{ color: "red" }}>{error}</p>;
	}

	return (
		<>
			<div className="armenian__list">
				{itemsToDisplay.map((item) => (
					<StoreCard
						key={item._id}
						image="/assets/img/company-image.png"
						title={item.name}
						rating={item.rating}
						time={item.deliveryTime.toString()}
						shippingCost={item.shippingCost.toString()}
					/>
				))}
			</div>

			{hasMoreItems && (
				<button className="armenian__show-btn btn" onClick={showMoreItems}>
					{tA("btn")}
				</button>
			)}

			{cardsToWatch === "all" && (
				<div className="armenian__info">
					{tAInfo("text1")} {itemsToDisplay.length} {tAInfo("text2")} {armenianItems.length} {tAInfo("text3")}
				</div>
			)}
		</>
	);
};

export default ArmenianList;