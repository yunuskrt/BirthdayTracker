import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import AuthForm from '@/components/authForm'
import Header from '@/components/header'
import Loading from '@/components/loading'

const Signup = () => {
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const signUpFormText = 'Already have an account?'

	const register = async (email, password) => {
		if (email === '' || password === '') {
			// front-end validation beside serverside validation
			alert('Email and Password are required')
		} else {
			setLoading(true)
			try {
				// send register request
				const response = await axios.post(
					'https://birthdaytracker-production.up.railway.app/api/v1/auth/register',
					{ email, password },
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				if (response.status === 201) {
					setLoading(false)
					router.push('/')
				}
			} catch (error) {
				console.log(error.message)
				alert('Email already exists')
			}
			setLoading(false)
		}
	}
	return loading ? (
		<Loading />
	) : (
		<div>
			<Header />
			<AuthForm
				title='Sign Up'
				onRedirect={() => router.push('/')}
				text={signUpFormText}
				linkText=' Sign in'
				onSubmit={register}
			/>
		</div>
	)
}

export default Signup
