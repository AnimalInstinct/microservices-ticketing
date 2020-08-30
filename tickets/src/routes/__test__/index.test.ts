import request from 'supertest'
import { app } from '../../app'

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
