import React, { useRef } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import styles from './authForm.module.css'
const AuthForm = ({ title, onRedirect, text, linkText, onSubmit }) => {
	const emailRef = useRef(null)
	const passwordRef = useRef(null)

	const handleSubmit = (e) => {
		e.preventDefault()
		const email = emailRef.current.value
		const password = passwordRef.current.value
		onSubmit(email, password)
	}

	return (
		<div className={styles.cardWrapper}>
			<Card className={styles.card}>
				<Card.Body>
					<Form className={styles.form} onSubmit={handleSubmit}>
						<h3 className={styles.formTitle}>{title}</h3>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								ref={emailRef}
							/>
						</Form.Group>
						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Password'
								ref={passwordRef}
							/>
						</Form.Group>
						<span className={styles.formText}>
							{text}
							<span className={styles.linkText} onClick={onRedirect}>
								{linkText}
							</span>
						</span>
						<Button variant='success' type='submit'>
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</div>
	)
}

export default AuthForm
