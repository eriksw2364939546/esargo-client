"use client";

import { useState, useRef, useEffect } from "react";
import "./Dropdown.scss"

const Dropdown = ({ dropLabel, dropList, withMarker }) => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		if (open) {
			document.body.classList.add("fixed-body")
		} else {
			document.body.classList.remove("fixed-body")
		}

		return () => {
			document.body.classList.remove("fixed-body")
		};
	}, [open]);

	// Закриваємо меню при кліку поза ним
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Обробник кліку на елементи меню
	const handleMenuItemClick = (event) => {
		// Перевіряємо, чи клік був на li або на елементі всередині li (посилання, кнопка)
		const clickedLi = event.target.closest('li');
		if (clickedLi && clickedLi.classList.contains('dropdown-menu__item')) {
			// Закриваємо dropdown після кліку
			setOpen(false);
		}
	};

	// Якщо dropLabel або dropList відсутні, то повертаємо null
	if (!dropLabel || !Array.isArray(dropList) || dropList.length === 0) return null;

	return (
		<div className="dropdown-wrapper" ref={dropdownRef}>
			<button className="dropdown-button" onClick={() => setOpen((prev) => !prev)}>
				<span>{dropLabel}</span>
				{/* <Image src={"/icons/arrow-label.svg"} width={10} height={10} alt=">" className="dropdown-wrapper-label" /> */}
			</button>
			{open && (
				<ul className="dropdown-menu" onClick={handleMenuItemClick}>
					{dropList.map((el, index) => (
						<li className={`dropdown-menu__item ${withMarker ? "with-marker" : ""}`} key={index + "-" + dropLabel}>
							{el}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;