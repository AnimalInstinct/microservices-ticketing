import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@alexhelloworld/common'
import cookieSession from 'cookie-session'
import { createTicketRouter } from './routes'

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
app.use(currentUser)
app.use(createTicketRouter)

app.get('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
