const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/profile', userController.profileUser)
router.post('/logout', userController.logoutUser)
router.post('/cart', userController.userCart)
router.get('/cart/:id', userController.userCartId)
router.put('/cart/:id', userController.userCartAddItem)

module.exports = router