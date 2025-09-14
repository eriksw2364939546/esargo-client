"use client"
import Image from "next/image"
import "./Loader.scss"

const Loader = ({ position }) => {

	return (
		<div className="Loader">
			<div className={`Loader__wrapper ${position}`}>
				{/* <Image src={"/icons/Loader.svg"} alt="Loading..." width={120} height={120} /> */}
				Loading...
			</div>
		</div>
	)
}

export default Loader