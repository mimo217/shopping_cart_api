const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/profile', userController.profileUser)
router.post('/logout', userController.logoutuser)
router.post('/carts', cartController.userCart)
router.get('/carts/:id', cartController.userCartId)
router.put('/carts/:id', cartController.userCartAddItem)


module.exports = router