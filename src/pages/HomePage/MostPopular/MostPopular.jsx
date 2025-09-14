"use client"
import "./MostPopular.scss"
import StoresList from "@/components/StoresList/StoresList"
import Link from "next/link"
import { useTranslations } from "next-intl"


const MostPopular = () => {

    const tMostPopular = useTranslations("homePage.mostPopular")

	return (
           <section className="most-popular">
            <div className="container">
                <h2 className="most-popular__title">{tMostPopular("title")}</h2>
                <p className="most-popular__descr">{tMostPopular("descr")}</p>
                <StoresList cardsToWatch={4} />
                <Link className="most-popular__all-btn btn" href="/most-popular">{tMostPopular("btn")}</Link>
            </div>
           </section>
	)
}

export default MostPopular