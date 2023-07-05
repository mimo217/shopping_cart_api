const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/profile/:id', userController.profileUser)
router.get('/logout', userController.auth, userController.logoutUser)
router.delete('/:id', userController.auth, userController.deleteUser)
router.post('/cart', userController.userCart)
router.get('/cart/:id', userController.userCartId)
router.put('/:userid/item/:itemid/', userController.userCartAddItem)
router.delete('/:userid/item/:itemid/', userController.userCartRemoveItem)

module.exports = router