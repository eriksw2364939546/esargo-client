'use client';
import { useState, useEffect } from "react";
import "./Header.scss";
import Image from "next/image";
import { Link } from "@/i18n/navigation"
import { Globe, Search } from "lucide-react";
import Basket from "../Basket/Basket";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Header = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [openedBurgerMenu, setOpenedBurgerMenu] = useState(false);
	const [isBasketOpen, setIsBasketOpen] = useState(false);
	const tHeader = useTranslations("header")

	useEffect(() => {
		if (openedBurgerMenu || isBasketOpen) {
			document.body.classList.add("fixed-body");
		} else {
			document.body.classList.remove("fixed-body");
		}
		return () => {
			document.body.classList.remove("fixed-body");
		};
	}, [openedBurgerMenu, isBasketOpen]);

	return (
		<header>
			<div className="container">
				<div className="header-items row">
					<div className="header-item">
						<Link href="/" className="header__logo">
							<div className="logo-container">
								<Image
									src="/assets/icon/header__logo.png"
									alt="Logo"
									fill
									style={{ objectFit: 'cover' }}
								/>
							</div>
						</Link>
					</div>

					<div className="header-item">
						<form className="search-form">
							<div className="search-input-wrapper row">
								<Search className="search-icon" size={20} />
								<input
									type="text"
									className="search-input"
									placeholder={tHeader("searchForm")}
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
						</form>
					</div>

					<div className="header-item">
						<nav className={`header__nav row ${openedBurgerMenu ? 'active' : ''}`}>
							{/* ✅ Заменено: button → div */}
							<div className="header__language head__btn">
								<Globe size={18} />
								<LanguageSwitcher />
							</div>

							<Link href="/login" className="login-btn head__btn">{tHeader("toLogin")}</Link>
							<Link href="/register" className="register-btn head__btn">{tHeader("toRegister")}</Link>
							<Basket setIsBasketOpen={setIsBasketOpen} />
						</nav>
					</div>

					{!isBasketOpen && 
						<button
							className={`header__burger ${openedBurgerMenu ? 'active' : ''}`}
							onClick={() => setOpenedBurgerMenu(prev => !prev)}
						>
							<figure></figure>
							<figure></figure>
							<figure></figure>
						</button>
					}
				</div>
			</div>
		</header>
	);
};

export default Header;
