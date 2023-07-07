const User = require('../models/user')
const Cart = require('../models/cart')
const Item = require('../models/item')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { use } = require('../app')

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data._id })
        if (!user) {
            throw new Error('bad credentials')
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = new User()
        user.name = name
        user.email = email
        user.password = password
        await user.save()

        const cart = new Cart({ user: user._id, items: [] })
        user.cart = cart
        await cart.save()
        await user.save()

        const token = await user.generateAuthToken(process.env.SECRET)
        res.status(200).json({ user: { name: user.name, email: user.email }, token, message: 'User registered successfully' })
    } catch (error) {
        res.status(400).json({ message: 'Unable to register the user', user: null })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            res.status(401).json({ message: 'Invalid login credentials' })
        } else {
            const token = await user.generateAuthToken(process.env.SECRET)
            res.json({ user, token })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.profileUser = async (req, res) => {
    try {
        const user = req.user
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

exports.logoutUser = async (req, res) => {
    try {
        const user = req.user
        user.tokens = []
        await user.save()
        res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne()
        res.json({ message: 'User deleted' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.userCartId = async (req, res) => {
    try {
        const userid = req.params.userid
        const user = await User.findById(userid).populate({ path: 'cart', populate: { path: 'items', model: 'Item'} })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const cart = user.cart
        res.json(cart)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.userCartAddItem = async (req, res) => {
    try {
        const { userid, itemid } = req.params
        const user = await User.findById(userid).populate({ path: 'cart', populate: { path: 'items', model: 'Item'} })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const item = await Item.findById(itemid)
        if (!item) {
            return res.status(400).json({ message: 'Item not found' })
        }

        if (!user.cart) {
            const cart = new Cart({ user: user.id, items: [] })
            user.cart = cart
            await cart.save()
            await user.save()
        }


        const itemIndex = user.cart.items.findIndex((items) => items._id.toString() === itemid)
        if (itemIndex !== -1) {
            user.cart.items[itemIndex].quantity++
            await user.cart.save()
            await user.save()
            return res.status(201).json({ message: "adding item to cart", cart: user.cart })
        }
        user.cart.items.push(item)
        await user.cart.save()
        await user.save()

        await user.cart.populate('items')

        res.status(201).json({ message: 'Item added to the user\'s cart', cart: user.cart })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.userCartRemoveItem = async (req, res) => {
    try {
        const { userid, itemid } = req.params
        const user = await User.findById(userid).populate({ path: 'cart', populate: { path: 'items', model: 'Item'} })

        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        if (!user.cart || !user.cart.items) {
            return res.status(400).json({ message: 'Cart is empty' })
        }
        
        const itemIndex = user.cart.items.findIndex((item) => item._id.toString() === itemid)

        if (itemIndex === -1) {
            return res.status(400).json({ message: 'Item not found in the cart' })
        }

        user.cart.items[itemIndex].quantity--
        if (user.cart.items[itemIndex].quantity === 0) {
            user.cart.items.splice(itemIndex, 1)
        }
        await user.cart.save()
        await user.save()

        const updatedUser = await User.findById(userid).populate({ path: 'cart', populate: { path: 'items', model: 'Item'} })
        
        res.status(200).json({ message: 'Item removed from the cart', cart: updatedUser.cart })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}