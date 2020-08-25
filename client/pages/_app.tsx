import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'

export default ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}
