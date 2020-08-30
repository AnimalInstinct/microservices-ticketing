import { Mongoose } from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'

const createTicket = (title: string, price: number) => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title, price })
    .expect(201)
}
it('can fetch list of tickets', async () => {
  await createTicket('Metallica', 130)
  await createTicket('Cranberries', 220)
  await createTicket('Eagle eye cherry', 150)
  await createTicket('Lenny Kravitz', 200)
  await createTicket('Aqua', 100)

  const response = await request(app).get('/api/tickets').send().expect(200)

  expect(response.body.length).toEqual(5)
})
it("returns 404 if provided id doesn't exists", async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await await request(app)
    .post(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'New Title',
      price: 20,
    })
    .expect(404)
})
it('returns 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await await request(app)
    .post(`/api/tickets/${id}`)
    .send({
      title: 'New Title',
      price: 20,
    })
    .expect(401)
})
it("returns 401 user doesn't own the ticket", async () => {
  const response = await createTicket('Metallica', 130)

  await request(app)
    .post(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'Philipp Kirkorov',
      price: 10,
    })
    .expect(401)
})
it('returns 400 if user provides invalid title or price', async () => {
  // Save cookie for update ticket with the same user logged in credentials that it was created
  const cookie = global.signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'Cranberries', price: 120 })
    .expect(201)

  await request(app)
    .post(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: '', price: 150 })
    .expect(400)

  await request(app)
    .post(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'New Title', price: -150 })
    .expect(400)
})
it('updates the ticket provided valid inposts', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'Cranberries', price: 120 })
    .expect(201)

  await request(app)
    .post(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'Lenny Kravitz', price: 150 })
    .expect(200)

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()

  expect(ticketResponse.body.title).toEqual('Lenny Kravitz')
  expect(ticketResponse.body.price).toEqual(150)
})
