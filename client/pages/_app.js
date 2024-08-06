import '../public/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from '@/components/header'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Header />
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
