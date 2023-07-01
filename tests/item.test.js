const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app  = require('../app')
const Item = require('../models/item')
let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
  mongoServer.stop();
});

describe('Test the items endpoints', () => {
  beforeEach(async () => {
    await Item.deleteMany();
  });

  test('It should get a list of items', async () => {
    const item1 = new Item({ name: 'Item 1', quanity: 1, price: $15, description: 'ladder' });
    await item1.save();
    const item2 = new Item({ name: 'Item 2', quantity: 3, price: $20, description: 'light bulb' });
    await item2.save();

    const response = await request(app).get('/items');

    expect(response.statusCode).toBe(200);
    expect(response.body.items.length).toBe(2);
    expect(response.body.items[0].name).toEqual('Item 1');
    expect(response.body.items[1].name).toEqual('Item 2');
  });

  test('It should get an item by ID', async () => {
    const item = new Item({ name: 'Example Item' });
    await item.save();

    const response = await request(app).get(`/items/${item._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.item.name).toEqual('Example Item');
  });
});