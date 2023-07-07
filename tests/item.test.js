const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app  = require('../app')
const Item = require('../models/item')

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
})

afterAll(async () => {
  await mongoose.connection.close();
  mongoServer.stop()
})

describe('Test the items endpoints', () => {
  beforeEach(async () => {
    await Item.deleteMany()
  })

  test('It should get a list of items', async () => {
    const item1 = new Item({ name: 'Ladder', quantity: 1, price: 15, description: 'ladder' });
    await item1.save()
    const item2 = new Item({ name: 'Light Bulb', quantity: 3, price: 20, description: 'light bulb' });
    await item2.save()

    const response = await request(app)
      .get('/items')

    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(2)
    expect(response.body[0].name).toEqual('Ladder')
    expect(response.body[1].name).toEqual('Light Bulb')
  });

  test('It should get an item by ID', async () => {
    const item = new Item({ name: 'Ladder', quantity: 1, price: 15, description: 'ladder' });
    await item.save()

    const response = await request(app).get(`/items/${item._id}`);

    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual('Ladder')
  });

  test('It should update an existing item', async () => {
    const item = new Item({ name: 'Light Bulb', quantity: 3, price: 20, description: 'light bulb' })
    await item.save()

    const updatedItem = { name: 'Soap', quantity: 1, price: 7, description: 'Lavendar Soap' }

    const response = await request(app)
      .put (`/items/${item._id}`)
      .send(updatedItem)

    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual('Soap')
    expect(response.body.quantity).toEqual(1)
    expect(response.body.price).toEqual(7)
    expect(response.body.description).toEqual('Lavendar Soap')
  })

  test('It should delete an item', async () => {
    const item = new Item({ name: 'Boba Tea', quantity: 1, price: 5, description: 'Boba Tea' })
    console.log(item)
    await item.save()

    const response = await request(app)
      .delete(`/items/${item._id}`)
      
    expect(response.statusCode).toBe(200);
    expect(response.body.item.name).toEqual('Boba Tea')
  

    const deletedItem = await Item.findById(item._id)
    expect(deletedItem).toBeNull()
  })
})
