"use client"
import MostPopularList from "@/components/StoresList/StoresList"
import Alpha from "./Alpha/Alpha"
import Categories from "./Categories/Categories"
import MostPopular from "./MostPopular/MostPopular"
import Armenian from "./Armenian/Armenian"


const HomePage = () => {

	return (
		<main>
			<Alpha />
			<Categories />
			<MostPopular />
			<Armenian/>
		</main>
	)
}

export default HomePage