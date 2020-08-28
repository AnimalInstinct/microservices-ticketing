import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from './routes'
import { errorHandler, NotFoundError } from '@alexhelloworld/common'
import cookieSession from 'cookie-session'

const app = express()
app.set('trust proxy', true)

app.use(json())
app.use(
  cookieSession({
    signed: false,
    // Cookie will be written only if connection secured by SSL
    // Cookie secured in prod env only and plain for test purposes
    secure: process.env.NODE_ENV !== 'test',
  })
)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.get('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
