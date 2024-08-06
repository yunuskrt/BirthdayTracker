import '../public/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Component {...pageProps} />
		</div>
	)
}

export default MyApp
