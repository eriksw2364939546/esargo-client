"use client"
import "./Categories.scss"
import { useTranslations } from 'next-intl';
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import Link from "next/link";


const Categories = () => {
    const tCategory = useTranslations("homePage.categories")
    const tCategoryCards = useTranslations("homePage.categories.cards")




    
    
const iconColors = ["#FFEDD5", "#FCE7F3", "#DCFCE7", "#DBEAFE", "#F3E8FF"]


    return (
        <section className="categories">
            <div className="container">

                <div className="categories__content">
                    <h2>{tCategory("title")}</h2>
                    <p className="categories__content-descr">{tCategory("p")}</p>
                    <div className="categories__content-cards row">
                        <CategoryCard 
                        icon="/assets/icon/category-pizza.svg"
                         title={tCategoryCards("food")}
                          color={iconColors[0]}  
                          />
                        <CategoryCard 
                        icon="/assets/icon/category-alcohol.svg"
                         title={tCategoryCards("alcohol")}
                          color={iconColors[1]} 
                          />
                        <CategoryCard 
                        icon="/assets/icon/category-cosmetics.svg"
                         title={tCategoryCards("cosmetics")}
                          color={iconColors[2]} 
                          />
                        <CategoryCard 
                        icon="/assets/icon/category-flower.svg"
                         title={tCategoryCards("flowers")}
                          color={iconColors[3]} 
                          />
                        <CategoryCard 
                        
                        icon="/assets/icon/category-pets.svg"
                         title={tCategoryCards("pets")}
                          color={iconColors[4]} 
                          />
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Categories


