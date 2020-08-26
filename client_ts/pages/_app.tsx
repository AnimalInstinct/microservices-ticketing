import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps, AppContext } from 'next/app'
import buildClient from '../api/build-client'

interface Props extends AppProps {
  currentUser: {
    email: string
  }
}

const AppComponent = (context: Props) => {
  const { Component, pageProps, currentUser } = context
  return (
    <div>
      <nav className='navbar navbar-expand navbar-light bg-light'>
        <div className='nav navbar-nav'>
          <a className='nav-item nav-link active' href='/'>
            Home <span className='sr-only'>(current)</span>
          </a>
          <a className='nav-item nav-link' href='/'>
            Home
          </a>
        </div>
      </nav>
      <h1>
        {currentUser ? currentUser.email : <a href='/auth/signin'>Sign In</a>}
      </h1>
      <Component {...pageProps} />
    </div>
  )
}

type Data = {
  data: {
    currentUser: {}
  }
}

AppComponent.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = (await client.get('/api/users/currentuser')) as Data

  let pageProps = {}
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }
  console.log(pageProps)
  return {
    pageProps,
    ...data,
  }
}

export default AppComponent
