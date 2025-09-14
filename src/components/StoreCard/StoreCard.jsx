"use client"

import "./StoreCard.scss"
import Link from "next/link"
import Image from "next/image"
import {Truck, Clock4, Star, Heart} from "lucide-react"

const MostPopularCard = ({
    id, 
    _id, // Добавляем поддержку _id
    image, 
    title, 
    rating, 
    time, 
    shippingCost 
}) => {
    // Используем _id если есть, иначе id
    const restaurantId = _id || id;
    
    return (
        <Link href={`/stores/${restaurantId}`} className="most__popular-card">
            <div className="most__popular-image__wrapper">
                <div className="most__popular-rating row"> 
                    <Star size={15} />
                    {rating || '4.5'}
                </div>
                <Image
                    className="most__popular-img"
                    src={image || '/assets/img/company-image.png'}
                    alt={`Изображение ${title}`}
                    fill
                    style={{objectFit: "cover"}}
                    sizes="330px"
                    priority
                />
            </div>
            <div className="popular-card__bottom-wrapper">
                <div className="most__popular-main row">
                    <p className="most__popular-title">{title}</p>
                    <button className="most__popular-rating__btn">
                        <Heart size={15}/>
                    </button>
                </div>
                <div className="most__popular-footer row">
                    <div className="most__popular-delivery__time row">
                        <Clock4 size={15} />
                        <p>{time || '30'} мин.</p>
                    </div>
                    <div className="most__popular-delivery row">
                        <Truck size={15} />
                        <p>{shippingCost || '3.5'}&euro;</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MostPopularCard