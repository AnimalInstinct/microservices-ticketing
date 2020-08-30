import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

// adding signin function to the global scope
declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[]
    }
  }
}

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

let mongo: any

beforeAll(async () => {
  //JWT signature key is in Kubernetes pods, so for test purposes we will use hardcoded one
  process.env.JWT_KEY = 'somerandomjwtsignaturefortest'
  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()
  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

// init global sign in function that returns cookie with user's details
global.signin = () => {
  // Build a JWT payload ({id,email})
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  }

  // Create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  // Build session object ({jwt:my_jwt})
  const session = { jwt: token }

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session)

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64')

  // Return a string thats the cookie with the data encoded
  return [`express:sess=${base64}`]
}
