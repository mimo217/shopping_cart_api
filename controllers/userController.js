const User = require('../models/user')
const Cart = require('../models/cart')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        const user = new User(req.body)
        await user.save()
        const cart = new Cart({ user: user._id})
        user.cart = cart
        await user.save()
        await user.cart.save()
        const token = await user.generateAuthToken()
        res.json({ user, token })
    } catch (error) {
        res.status(400).json({ messaage: error.message })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            throw new Error('Invalid login credentials')
        } else {
            const token = await user.generateAuthToken()
            res.json({ user, token })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.userProfile = async (req, res) => {
    try {
        const user = req.user
        res.json({ user })

    } catch (error) {
        res.status(400).json({message: error. message})
    
    }
}