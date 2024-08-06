import React from 'react'
import { useRouter } from 'next/router'
import AuthForm from '@/components/authForm'

const Home = () => {
	const router = useRouter()
	const signInFormText = "Don't have an account?"
	return (
		<AuthForm
			title='Sign In'
			onRedirect={() => router.push('/signup')}
			text={signInFormText}
			linkText=' Sign Up'
			onSubmit={(email, password) => {
				console.log({ email, password })
			}}
		/>
	)
}

export default Home
