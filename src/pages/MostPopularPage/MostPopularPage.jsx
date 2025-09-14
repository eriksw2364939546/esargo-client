"use client"
import "./MostPopularPage.scss"
import MostPopularList from "@/components/StoresList/StoresList"
import { useTranslations } from "next-intl"

const MostPopularPage = () => {

    const tMPP = useTranslations("MostPopularPage")

    return (
        <main className="most-popular__page">
            <div className="container">
                <h1>{tMPP("title")}</h1>
                <MostPopularList cardsToWatch="all" />
            </div>
        </main>
    )
}

export default MostPopularPage