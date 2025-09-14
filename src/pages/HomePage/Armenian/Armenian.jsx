"use client"
import "./Armenian.scss"
import Link from "next/link"
import ArmenianList from "@/components/ArmenianList/ArmenianList"
import { useTranslations } from "next-intl"

const Armenian = () => {
    const tArmenian = useTranslations("homePage.armenian")

    return(
        <section className="armenian">
            <div className="container">
                    <h3 className="arminian-title">{tArmenian("title")}</h3>
                    <p className="arminian-descr">{tArmenian("descr")}</p>

                    <ArmenianList cardsToWatch={4} />

                    <Link className="armenian__all-btn btn" href="/all-armenian">{tArmenian("btn")}</Link>

            </div>
        </section>
    )

}


export default Armenian