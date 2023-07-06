require('dotenv').config();
const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const User = require('../models/user')
const Item = require('../models/item')
const Cart = require('../models/cart')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
        const response = await request(app)
            .post('/users/register')
            .send({
                name: 'Harry Potter',
                email: 'Harry.Potter@Hogwarts.com',
                password: 'Gryfindoor1234567'
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Harry Potter')
        expect(response.body.user.email).toEqual('Harry.Potter@Hogwarts.com')
        expect(response.body).toHaveProperty('token')
    })

    test('It should login a user', async () => {
        const user = new User({ name: 'Harry Potter', email: 'Harry.Potter@Hogwarts.com', password: 'Gryfindoor1234567' })
        await user.save()

        const response = await request(app)
            .post('/users/login')
            .send({ email: 'Harry.Potter@Hogwarts.com', password: 'Gryfindoor1234567' })

        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Harry Potter')
        expect(response.body.user.email).toEqual('Harry.Potter@Hogwarts.com')
        expect(response.body).toHaveProperty('token')
    })

    test('It should get the user profile', async () => {
        const user = new User({ name: 'Harry Potter', email: 'Harry.Potter@Hogwarts.com', password: 'Gryfindoor1234567' })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
            .get(`/users/profile/${user._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Harry Potter')
        expect(response.body.email).toEqual('Harry.Potter@Hogwarts.com')
    })


    test('It should logout a user', async () => {
        const user = new User({
            name: 'Harry Potter',
            email: 'Harry.Potter@Hogwarts.com',
            password: 'Gryfindoor1234567',
            tokens: [{ token: 'sampleToken' }]
        })
        await user.save()

        const token = jwt.sign({ _id: user._id }, process.env.SECRET)

        user.tokens = []
        await user.save()


        const response = await request(app)
            .post('/users/logout')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('Logout successful')
    })


    test('It should delete a user', async () => {
        const user = new User({ name: 'Harry Potter', email: 'Harry.Potter@Hogwarts.com', password: 'Gryfindoor1234567' })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
            .delete(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('User deleted')
    })

    test('It should get the user\'s cart by ID', async () => {
        //const cart = new Cart({})

        const user = new User({ name: 'Harry Potter', email: 'Harry.Potter@Hogwarts.com', password: 'Gryfindoor1234567' })
        await user.save()

        const cart = new Cart({ user: user._id, items: [] })
        user.cart = cart
        await cart.save()
        await user.save()

        const item = new Item({ name: 'bucket', quantity: 1, price: 3, description: 'bucketbro' })
        await item.save()

        user.cart.items.push(item._id)
        await cart.save()
        await user.save()

        const token = jwt.sign({ _id: user._id }, process.env.SECRET)

        const response = await request(app)
            .get(`/users/cart/${user.id}`)
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.items).toHaveLength(1)
        expect(response.body.items[0]).toEqual(item.id)
    })

    test('It should add an item to the user\'s cart by ID', async () => {
        const user = new User({ name: 'Harry Potter', email: 'Harry.Potter@Hogwarts.com', password: 'Gryfindoor1234567' })
        await user.save()
        const item = new Item({ name: 'Jelly Beans', quantity: 1, price: 5, description: 'Beanbozzled' })
        await item.save()
        
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)

        const response = await request(app)
            .post(`/users/${user._id}/item/${item._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(201)
        expect(response.body.message).toEqual('Item added to the user\'s cart')

        const updatedUser = await User.findById(user._id)
        expect(updatedUser.cart).toBeDefined()
        expect(updatedUser.body.cart.items).toHaveLength(1)
        expect(response.body.cart.items[0].toString()).toEqual(item._id.toString())   
    })

    test('It should remove an item from the user\'s cart by ID', async () => {
        const user = new User({ name: 'Harry Potter', email: 'Harry.Potter@Hogwarts.com', password: 'Gryfindoor1234567' })
        await user.save()
        const item = new Item({ name: 'wand', quantity: 1, price: 12, description: 'magic wand' })
        await item.save()

        user.cart = new Cart({ user: user._id, items: [item._id] })
        await user.cart.save()
        await user.save()

        const token = jwt.sign({ _id: user._id }, process.env.SECRET)

        const response = await request(app)
            .delete(`/users/${user._id}/item/${item._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('Item removed from the cart')

        const updatedUser = await User.findById(user._id).populate('cart.items')
        expect(updatedUser.cart.items).toHaveLength(0)
    })
})