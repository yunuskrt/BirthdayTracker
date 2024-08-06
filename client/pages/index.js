import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import AuthForm from '@/components/authForm'
import Loading from '@/components/loading'
import Header from '@/components/header'
import BirthdayTable from '@/components/birthdayTable'
import UpcomingBirthdayTable from '@/components/upcomingBirthdayTable'
import { Alert } from 'react-bootstrap'
import styles from './index.module.css'
const Home = () => {
	const router = useRouter()
	const signInFormText = "Don't have an account?"

	const [notification, setNotification] = useState({
		show: false,
		type: '',
		message: '',
	})
	const alertNotification = (type, message) => {
		// set notification
		setNotification({
			show: true,
			type: type,
			message: message,
		})
		setTimeout(() => {
			setNotification({
				show: false,
				type: '',
				message: '',
			})
		}, 2000)
	}

	const [upcomingRange, setUpcomingRange] = useState(30)
	const [auth, setAuth] = useState({
		accessToken: null,
		data: [],
		upcoming: [],
	})
	const [loading, setLoading] = useState(false)

	const login = async (email, password) => {
		if (email === '' || password === '') {
			// front-end validation beside serverside validation
			alertNotification('danger', 'Email and Password are required')
		} else {
			setLoading(true)
			// send login request
			try {
				const response = await axios.post(
					'http://localhost:8080/api/v1/auth/login',
					{ email, password },
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				if (response.status === 200) {
					const accessToken = response.data.access_token
					// first time data fetched after login
					const fetchedData = await getAllBirthdays(accessToken)
					setAuth({
						accessToken,
						data: fetchedData.data,
						upcoming: fetchedData.upcoming,
					})
					alertNotification('success', 'Logged in!')
				}
			} catch (error) {
				if (error.code === 'ERR_BAD_REQUEST') {
					alertNotification('danger', 'Invalid Authentication')
					setAuth({ accessToken: null, data: [], upcoming: [] })
				} else {
					alertNotification('danger', 'Something went wrong')
				}
			}
			setLoading(false)
		}
	}

	const getAllBirthdays = async (accessToken) => {
		try {
			const response = await axios.get(
				'http://localhost:8080/api/v1/birthdays',
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: accessToken,
					},
				}
			)
			if (response.status === 200) {
				const data = response.data
				const upcomingData = data.filter((item) => {
					return item.daysUntil <= upcomingRange
				})
				return { data, upcoming: upcomingData }
			}
			return []
		} catch (error) {
			console.log(error.message)
			return []
		}
	}

	const deleteBirthday = async (id) => {
		// send delete request
		setLoading(true)
		try {
			const response = await axios.delete(
				`http://localhost:8080/api/v1/birthdays/${id}`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: auth.accessToken,
					},
				}
			)
			if (response.status === 204) {
				const fetchedData = await getAllBirthdays(auth.accessToken)
				setAuth((prevData) => ({
					...prevData,
					data: fetchedData.data,
					upcoming: fetchedData.upcoming,
				}))
				alertNotification('success', 'Birthday deleted successfully')
			} else {
				alertNotification('danger', 'Something went wrong')
				setAuth({ accessToken: null, data: [], upcoming: [] })
			}
		} catch (error) {
			console.log(error.message)
			if (error.code === 'ERR_BAD_REQUEST') {
				alertNotification('danger', 'Invalid Authentication')
			} else {
				alertNotification('danger', 'Something went wrong')
			}
			setAuth({ accessToken: null, data: [], upcoming: [] })
		}
		setLoading(false)
	}

	const updateBirthday = async (birthdayData) => {
		if (birthdayData.name === '' || birthdayData.date === '') {
			// front-end validation beside serverside validation
			alertNotification('danger', 'Name and Date are required')
		} else {
			setLoading(true)
			try {
				// send edit request
				const response = await axios.put(
					`http://localhost:8080/api/v1/birthdays/${birthdayData.id}`,
					{
						name: birthdayData.name,
						category:
							birthdayData.category === '' ? null : birthdayData.category,
						date: birthdayData.date,
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: auth.accessToken,
						},
					}
				)
				if (response.status === 200) {
					const fetchedData = await getAllBirthdays(auth.accessToken)
					setAuth((prevData) => ({
						...prevData,
						data: fetchedData.data,
						upcoming: fetchedData.upcoming,
					}))
					alertNotification('success', 'Birthday updated successfully')
				} else {
					alertNotification('danger', 'Something went wrong')
					setAuth({ accessToken: null, data: [], upcoming: [] })
				}
			} catch (error) {
				console.log(error.message)
				if (error.code === 'ERR_BAD_REQUEST') {
					alertNotification('danger', 'Invalid Authentication')
				} else {
					alertNotification('danger', 'Something went wrong')
				}
				setAuth({ accessToken: null, data: [], upcoming: [] })
			}
			setLoading(false)
		}
	}

	const createBirthday = async (birthdayData) => {
		if (birthdayData.name === '' || birthdayData.date === '') {
			// front-end validation beside serverside validation
			alertNotification('danger', 'Name and Date are required')
		} else {
			let data
			if (birthdayData.category === '') {
				data = { name: birthdayData.name, date: birthdayData.date }
			} else {
				data = birthdayData
			}
			// send create request
			setLoading(true)
			try {
				const response = await axios.post(
					'http://localhost:8080/api/v1/birthdays',
					data,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: auth.accessToken,
						},
					}
				)
				if (response.status === 201) {
					const fetchedData = await getAllBirthdays(auth.accessToken)
					setAuth((prevData) => ({
						...prevData,
						data: fetchedData.data,
						upcoming: fetchedData.upcoming,
					}))
					alertNotification('danger', 'Birthday created successfully')
				} else {
					alertNotification('danger', 'Something went wrong')
					setAuth({ accessToken: null, data: [], upcoming: [] })
				}
			} catch (error) {
				console.log(error.message)
				if (error.code === 'ERR_BAD_REQUEST') {
					alertNotification('danger', 'Invalid Authentication')
				} else {
					alertNotification('danger', 'Something went wrong')
				}
				setAuth({ accessToken: null, data: [], upcoming: [] })
			}
			setLoading(false)
		}
	}

	const selectRange = (range) => {
		const rangeInt = parseInt(range)

		setUpcomingRange(rangeInt)
		const upcomingData = auth.data.filter((item) => {
			return item.daysUntil <= rangeInt
		})
		setAuth((prevData) => ({
			...prevData,
			upcoming: upcomingData,
		}))
	}

	return loading ? (
		<Loading />
	) : (
		<div>
			{notification.show && (
				<Alert variant={notification.type}>{notification.message}</Alert>
			)}
			<Header />
			{auth.accessToken !== null ? (
				<div className={styles.tableContainer}>
					<UpcomingBirthdayTable
						data={auth.upcoming}
						range={upcomingRange}
						onSelect={selectRange}
					/>
					<BirthdayTable
						data={auth.data}
						onDelete={deleteBirthday}
						onEdit={updateBirthday}
						onCreate={createBirthday}
					/>
				</div>
			) : (
				<AuthForm
					title='Sign In'
					onRedirect={() => router.push('/signup')}
					text={signInFormText}
					linkText=' Sign Up'
					onSubmit={login}
				/>
			)}
		</div>
	)
}

export default Home
