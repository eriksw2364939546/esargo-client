"use client"
import "./ArmenianPage.scss"
import ArmenianList from "@/components/ArmenianList/ArmenianList"
import { useTranslations } from "next-intl"

const ArmenianPage = () => {

    const tArmenian = useTranslations("armenianPage")

    return (
        <main className="armenian__page">
            <div className="container">
                <h1>{tArmenian("title")}</h1>
                <ArmenianList cardsToWatch="all" />
            </div>
        </main>
    )
}

export default ArmenianPage