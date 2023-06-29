const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/profile', userController.profileUser)
router.post('/logout', userController.logoutUser)
router.post('/carts', userController.userCart)
router.get('/carts/:id', userController.userCartId)
router.put('/carts/:id', userController.userCartAddItem)


module.exports = router