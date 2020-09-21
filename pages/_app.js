import '../styles/normalize.css'
import '../styles/globals.css'
import 'react-multi-carousel/lib/styles.css'
import '@wordpress/block-library/build-style/style.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
