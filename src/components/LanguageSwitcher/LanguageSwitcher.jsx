'use client';
import Dropdown from '@/components/Dropdown/Dropdown';
import { Link, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import "./LanguageSwitcher.scss"

function LanguageSwitcher() {
	const pathname = usePathname();
	const locale = useLocale();
	const labelLocale = locale === "ru" ? "en" : "ru";

	return (
		<div className="LanguageSwitcher">
			<Dropdown
				withMarker={false}
				dropLabel={<span className='LanguageSwitcher__label'>{locale}</span>}
				dropList={[
					<Link href={pathname} locale={labelLocale} key="lang-link">
						<span className='LanguageSwitcher__label'>{labelLocale}</span>
					</Link>
				]}
			/>
		</div>
	);
}

export default LanguageSwitcher;