import express from 'express'
import { json } from 'body-parser'
import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from './routes'
import { errorHandler } from './middlewares'

const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(errorHandler)

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
