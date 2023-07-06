const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/profile/:id', userController.auth,userController.profileUser)
router.post('/logout', userController.auth, userController.logoutUser)
router.delete('/:id', userController.auth, userController.deleteUser)
router.get('/cart/:userid', userController.auth, userController.userCartId)
router.post('/:userid/item/:itemid/', userController.auth, userController.userCartAddItem)
router.delete('/:userid/item/:itemid/', userController.auth, userController.userCartRemoveItem)

module.exports = router