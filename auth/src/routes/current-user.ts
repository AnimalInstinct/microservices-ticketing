import express from 'express'

const router = express.Router()

router.get('/api/users/currentuser', (req, res) => {
  res.send('Current user page')
})

export { router as currentUserRouter }
