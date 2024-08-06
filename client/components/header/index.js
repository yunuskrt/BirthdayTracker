import React from 'react'
import { useRouter } from 'next/router'
import { FaBirthdayCake } from 'react-icons/fa'
import styles from './header.module.css'
const Header = () => {
	const router = useRouter()
	return (
		<div className={styles.header}>
			<div className={styles.icon} onClick={() => router.push('/')}>
				<FaBirthdayCake size={40} />
				<span>Birthday Tracker</span>
			</div>
		</div>
	)
}

export default Header
