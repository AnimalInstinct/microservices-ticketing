# Microservices Ticketing APP

### App is Under construction.

### Installation and running

Deployment mechanism presented by docker containers orchestrating by Kubernetes. Dev environment configured for Skaffold. To get run App on your local machine in dev mode:

Clone the repo repo

```bash
git clone git@github.com:AnimalInstinct/microservices-ticketing.git
```

#### Signing key

Signing key generated by Kubernetes Secret mechanism and pushed to pods as an env variable providing built in tamper-resistant way to expire or invalidate JWT adding signing key to the JWT generated.

As far signing key generated and stored to env variable manually using this command:

```bash
kubectl create secret generic jwtsecret --from-literal=JWT_KEY=YOUR_SECRET_KEY
```

replace YOUR_SECRET_KEY with your secured 256bit generated private key, [can use this service](https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx)

Run Skaffold from the project directory

```bash
cd microservices-ticketing
```

```bash
skaffold dev
```

## Key features:

### Authentication microservice

Centralised JWT based authentication microservice for all the microservices spreaded among the system. All the related user information according his status stored in JWT as payload and encrypted in JWT Creation Algorithm so all other services has a logic that decrypt JWT provided, get details about user and decide if user is authenticated and if user has enough rights to use functions provided by the service.

JWT stored in cookies to resolve server side rendering issue when the first request getting HTML rendered by server should get JWT auth token and store it before JS will be requested.

Do not require any kind of data from a server.

Easily understood between microservices based on different languages.

This implementation has minuses and pluses

- Auth service independent from other services that great for the Microservices architecture

- Not a real-time approach, granted JWT will pass authentication even if Administrator will change related to User status settings. As services haven't communicating with Auth service in real time, the will not get information in real time.

## Unit tests for each or service component, middleware and function

JEST using for tests running, to start testing just input this command in your terminal from any service folder

```bash
npm run tests
```

## SEO friendly Server Side Rendering ReactJS + NextJS frontend microservice

First challenge is a resolving issues with SEO in One Page frontend applications.Next JS server side rendered React JS frontend application allows to get maximum from SEO optimization and gives simple rendered HTML code to the search system robots, that decrease time to index new pages and increase SEO optimization. Decrease page loading time and makes user experience better. App consume less traffic and do not consumes user's device resourses.

### Helmet

...Blah blah blah about the helmet

## Cross-namespace communication between services Pods challenge

In the server side rendering architecture, NextJS uses server-side rendered getInitialProps executed on a server in most cases. In the world of Kubernetes axios server side requests to the base URL's routing by Ingress Nginx and going in their namespaces only by default. Nginx-ingress service running in different namespace and thats the challenge in Microservices architecture. For the communication between services in different namespaces we can use URL's like: http://SERVICE-NAME.NAMESPACE-NAME.svc.cluster.local/foo/bar

To solve this issue any time whe we make a request to the API server in NextJS we have to check is it server side or client side request and determine the base URL.

To keep code clear this job should be done by reusable helper like React Hook, problem is - this is not a React, hooks operates in React components only, it will not work inside of getInitialProps function so it should be a helper with clear function exposed - build-client helper (/client/api/build-client.tsx).

```js
import buildClient from '../api/build-client'

const LandingPage = ({ currentUser }) => {
  return <h1>{currentUser.email}</h1>
}

LandingPage.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get('/api/users/currentuser')
  return data
}

export default LandingPage
```

## useRequest custom ReactJS hook to handle axios requests and errors

How to use:

```js
import { useRequest } from '../../hooks'

const { doRequest, errors } = useRequest({
  url: '/api/users/signup',
  method: 'post',
  body: {
    email,
    password,
  },
})

const onSubmit = async (event) => {
  event.preventDefault()
  doRequest()
}

return (
    <form onSubmit={onSubmit}>
      <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='text'
          className='form-control'
        />
         <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='text'
          className='form-control'
        />
        <button className='btn btn-primary'>Sign Up</button>
      {errors}
    </form>
  )
}
```

## CQRS Event Sourcing

### Deployment
