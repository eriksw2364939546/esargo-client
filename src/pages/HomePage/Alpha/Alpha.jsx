"use client"
import "./Alpha.scss"
import { useTranslations } from 'next-intl';
import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

const Alpha = () => {
	const tAlpha = useTranslations("homePage.alpha")
	
	const [address, setAddress] = useState("");
	const [confirmedAddress, setConfirmedAddress] = useState("");
	const [isEditing, setIsEditing] = useState(true);

	// Загружаем адрес из localStorage при загрузке компонента
	useEffect(() => {
		const savedAddress = localStorage.getItem('deliveryAddress');
		if (savedAddress) {
			setConfirmedAddress(savedAddress);
			setIsEditing(false);
		}
	}, []);

	const handleAddressConfirm = (e) => {
		e.preventDefault();
		if (address.trim()) {
			setConfirmedAddress(address);
			setIsEditing(false);
			// Сохраняем в localStorage
			localStorage.setItem('deliveryAddress', address);
		}
	};

	const handleAddressChange = () => {
		setIsEditing(true);
		setAddress(confirmedAddress);
		// Удаляем из localStorage при начале изменения
		localStorage.removeItem('deliveryAddress');
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleAddressConfirm(e);
		}
	};

	return (
		<section className="alpha">
			<div className="container">
				<div className="alpha__content">
					<h1 dangerouslySetInnerHTML={{ __html: tAlpha("title") }} />
					<p>{tAlpha("p")}</p>
					
					<div className="alpha__address">
						{isEditing ? 
							<form onSubmit={handleAddressConfirm} className="alpha__address-form">
								<div className="alpha__input-wrapper">
									<MapPin  size={20}/>
									<input 
										type="text"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										onKeyPress={handleKeyPress}
										placeholder="Введите ваш адрес"
										className="alpha__input"
										required
									/>
								</div>
								<button 
									type="submit"
									disabled={!address.trim()}
									className="alpha__confirm-btn btn"
								>
									Добавить
								</button>
							</form>
						 : 
							<div className="alpha__address-confirmed">
								<h3>Ваш адрес доставки</h3>
								<p className="alpha__address-text">{confirmedAddress}</p>
								<button 
									onClick={handleAddressChange}
									className="alpha__change-btn head__btn"
								>
									Изменить
								</button>
							</div>
						}
					</div>
					
					<Link href="conditions">{tAlpha("toConditions")} &rarr;</Link>
				</div>
			</div>
		</section>
	)
}

export default Alpha