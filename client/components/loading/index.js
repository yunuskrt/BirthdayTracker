import React from 'react'
import { Spinner } from 'react-bootstrap'
import styles from './loading.module.css'

const Loading = () => {
	return (
		<div className={styles.loadingContainer}>
			<Spinner animation='border' variant='dark' size='xxl' />
		</div>
	)
}

export default Loading
