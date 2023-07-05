const User = require('../models/user')
const Cart = require('../models/cart')
const Item = require('../models/item')
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
        const cart = new Cart({ user: user._id })
        user.cart = cart
        await user.save()
        await user.cart.save()
        const token = await user.generateAuthToken(process.env.SECRET)
        res.status(200).json({ user: {name: user.name,email: user.email }, token, message: 'User registered successfully' })
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Unable to register the user', user: null })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            throw new Error('Invalid login credentials')
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
        const user = await User.findOne({ _id: req.params.id })
        res.json({ user })

    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}

exports.logoutUser = async (req, res) => {
    try {
        const user = req.user
        user.token = []
        await user.save()
        res.json({ message: 'Logout successful' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try{
      await req.user.deleteOne()
      res.json({ message: 'User deleted' })
    }catch(error){
      res.status(400).json({message: error.message})
    }
  }



exports.userCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(400).json({ message: 'Item not found' })
        }

        user.cart.push(item)
        await user.save();

        res.json({ message: 'Item added to the user\'s cart' });
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}

exports.userCartId = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        const cart = user.cart
        res.json({ cart })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.userCartAddItem = async (req, res) => {
    try {
        const { userid, itemid } = req.body
        const user = await User.findById(userid);
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        const item = await Item.findById(itemid)
        if (!item) {
            return res.status(400).json({ message: 'Item not found' })
        }
        const cart = await Cart.findById(user.cart)
        cart.items.push(itemid)
        console.log(cart)
        await cart.save();
        await user.save();
        res.json(cart)
    } catch (error) {
        res.status(400).json({ message: 'error.message' })
    }
}

exports.userCartRemoveItem = async (req, res) => {
    try {
        const itemid = req.params.itemid
        const user = req.user
        const index = user.cart.items.indexOf(itemid)
        if (index === -1) {
            return res.status(400).json({ message: 'Item not found in the cart' })
        }
        user.cart.items.splice(index, 1);
        await user.save()
        res.json({ message: 'Item removed from the cart' })
    } catch (error) {
        res.status(400).json({ message: 'error.message' })
    }
}
