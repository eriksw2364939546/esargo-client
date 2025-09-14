"use client"

import "./CategoryCard.scss"
import Link from "next/link"
import Image from "next/image"

const CategoryCard = ({icon, title, color}) => {

    return (
        <Link href="#" className="category-card">
            <div className="category__icon" style={{ background: color }}>
                <Image src={icon} alt="Category icon"  width={30} height={30}/>
            </div>

            <p className="category-card__title">{title}</p>
        </Link>
    )

} 

export default CategoryCard
