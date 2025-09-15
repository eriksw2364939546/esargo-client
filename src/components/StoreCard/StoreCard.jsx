// StoreCard.jsx - ИСПРАВЛЕННАЯ ВЕРСИЯ

"use client"

import "./StoreCard.scss"
import Link from "next/link"
import Image from "next/image"
import { Truck, Clock4, Star, Heart } from "lucide-react"

const StoreCard = ({
    id, 
    _id, // Добавляем поддержку _id
    image, 
    name,     // ✅ ИСПРАВЛЕНО: используем name вместо title
    title,    // Оставляем для совместимости
    rating, 
    time, 
    deliveryTime,  // ✅ Добавляем альтернативные названия
    shippingCost,
    minOrder,      // ✅ Добавляем minOrder
    deliveryFee,   // ✅ Альтернативное название
    isOpen,        // ✅ Добавляем статус работы
    cuisine,       // ✅ Добавляем тип кухни
    category       // ✅ Добавляем категорию
}) => {
    // Используем _id если есть, иначе id
    const restaurantId = _id || id;
    
    // ✅ Определяем название (приоритет name, потом title)
    const restaurantName = name || title || 'Ресторан';
    
    // ✅ Определяем время доставки
    const displayTime = deliveryTime || time || '30';
    
    // ✅ Определяем стоимость (приоритет minOrder, потом deliveryFee, потом shippingCost)
    const displayCost = minOrder || deliveryFee || shippingCost || '3.5';
    
    // ✅ Форматируем рейтинг
    const displayRating = rating ? (typeof rating === 'number' ? rating.toFixed(1) : rating) : '4.5';
    
    return (
        <Link href={`/stores/${restaurantId}`} className="most__popular-card">
            <div className="most__popular-image__wrapper">
                <div className="most__popular-rating">
                    <Star size={12} fill="currentColor" />
                    {displayRating}
                </div>
                
                {/* ✅ Добавляем индикатор статуса работы */}
                {isOpen !== undefined && (
                    <div className={`restaurant-status ${isOpen ? 'open' : 'closed'}`}>
                        {isOpen ? 'Открыто' : 'Закрыто'}
                    </div>
                )}
                
                <Image
                    className="most__popular-img"
                    src={image || '/assets/img/company-image.png'}
                    alt={`Изображение ${restaurantName}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 425px) 280px, 330px"
                    priority={false} // ✅ Убираем priority для всех карточек
                />
            </div>
            
            <div className="popular-card__bottom-wrapper">
                <div className="most__popular-main">
                    <h3 className="most__popular-title" title={restaurantName}>
                        {restaurantName}
                    </h3>
                    <button 
                        className="most__popular-rating__btn"
                        type="button"
                        aria-label="Добавить в избранное"
                        onClick={(e) => {
                            // ✅ Предотвращаем переход по ссылке при клике на кнопку
                            e.preventDefault();
                            e.stopPropagation();
                            // Здесь будет логика добавления в избранное
                            console.log('Добавить в избранное:', restaurantId);
                        }}
                    >
                        <Heart size={14} />
                    </button>
                </div>
                
                {/* ✅ Добавляем тип кухни если есть */}
                {(cuisine || category) && (
                    <div className="restaurant-cuisine">
                        {cuisine || category}
                    </div>
                )}
                
                <div className="most__popular-footer">
                    <div className="most__popular-delivery__time">
                        <Clock4 size={14} />
                        <p>{displayTime} мин.</p>
                    </div>
                    <div className="most__popular-delivery">
                        <Truck size={14} />
                        <p>{displayCost}&euro;</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default StoreCard