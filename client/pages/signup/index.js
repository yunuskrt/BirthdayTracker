import React from 'react'
import { useRouter } from 'next/router'
import AuthForm from '@/components/authForm'

const Signup = () => {
	const router = useRouter()
	const signUpFormText = 'Already have an account?'
	return (
		<AuthForm
			title='Sign Up'
			onRedirect={() => router.push('/')}
			text={signUpFormText}
			linkText=' Sign in'
			onSubmit={(email, password) => {
				console.log({ email, password })
			}}
		/>
	)
}

export default Signup
