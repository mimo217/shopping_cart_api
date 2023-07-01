const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app  = require('../app')
const User = require('../models/user')
const Item = require('../models/item')
const bcrypt = require('bcrypt')

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
  await mongoose.connection.close()
  mongoServer.stop()
})

describe('Test the users endpoints', () => {
    beforeEach(async () => {
        await User.deleteMany();
    });

test('It should create/register a new user', async () => {
    const response = await request (app)
    .post('/users')
    .send({name: 'Amy Johnson', email: 'Amy.Johnson@yahoo.com', password: 'chips123456'})

    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toEqual('Amy Johnson')
    expect(response.body.user.email).toEqual('Amy.Johnson@yahoo.com')
    expect(response.body).toHaveProperty('token')
  })

  test('It should login a user', async () => {
    const user = new User({ name: 'Amy Johnson', email: 'Amy.Johnson@yahoo.com', password: 'chips123456' })
    await user.save()

    const response = await request(app)
      .post('/users/login')
      .send({ email: 'Amy.Johnson@yahoo.com', password: 'chips123456' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toEqual('Amy Johnson')
    expect(response.body.user.email).toEqual('Amy.Johnson@yahoo.com')
    expect(response.body).toHaveProperty('token')
  })

  test('It should update a user', async () => {
    const user = new User({ name: 'Amy Johnson', email: 'Amy.Johnson@yahoo.com', password: 'chips123456' })
    await user.save()
    const token = await user.generateAuthToken()

    const response = await request(app)
      .put(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Stan Smith', email: 'stansmith@yahoo.com' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual('Stan Smith')
    expect(response.body.email).toEqual('stansmith@yahoo.com')
  })

  test('It should delete a user', async () => {
    const user = new User({ name: 'Amy Johnson', email: 'Amy.Johnson@yahoo.com', password: 'chips123456' })
    await user.save()
    const token = await user.generateAuthToken()

    const response = await request(app)
      .delete(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual('User deleted')
  })
})

test('It should add an item to the user\'s cart', async () => {
    const user = new User({ name: 'Amy Johnson', email: 'Amy.Johnson@yahoo.com', password: 'chips123456' })
    await user.save()
    const item = new Item({ name: 'bucket' })
    await item.save()

    const response = await request(app)
       .post('/users/cart')
       .send({ userId: user._id, itemId: item.id });
    
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual('Item added to the user\'s cart')
    const updatedUser = await User.findById(user._id)
    expect(updatedUser.cart.length).toBe(1)
    expect(updatedUser.cart[0]._id.toString()).toEqual(item._id.toString())
  })

  test('It should get the user\'s cart by ID', async () => {
    const user = new User({ name: 'Amy Johnson', email: 'Amy.Johnson@yahoo.com', password: 'chips123456' })
    await user.save()
    const item = new Item({ name: 'bucket' })
    await item.save()
    user.cart.push(item)
    await user.save()

    const response = await request(app).get(`/users/cart/${user._id}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.cart.length).toBe(1)
    expect(response.body.cart[0].id.toString()).toEqual(item._id.toString())
  })

  test('It should add an item to the user\'s cart by ID', async () => {
    const user = new User({ name: 'Amy Johnson', email: 'Amy.Johnson@yahoo.com', password: 'chips123456' })
    await user.save()
    const item = new Item({ name: 'bucket' })
    await item.save()
   
    const response = await request(app)
    .post(`/users/cart/${user._id}/${item._id}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual('Item added to the user\'s cart')
    const updatedUser = await User.findById(user._id)
    expect(updatedUser.response.cart.length).toBe(1)
    expect(response.body.cart[0].id.toString()).toEqual(item._id.toString())
  })



