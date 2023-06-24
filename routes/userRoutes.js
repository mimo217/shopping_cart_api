const express = require('express')
const route = express.Router()
const userController = require('../controllers/userController')
const itemController = require('../controllers/itemController')
const cartController = require('../controllers/cartController')


router.post('user/register', userController.registerUser)
route.post('user/login', userController.loginUser)
route.post('user/profile', userController.profileUser)
route.post('user/logout', userController.logoutuser)
route.get('/items', itemController.itemList)
route.get('/items/:id', itemController.itemId)
route.post('/carts', cartController.userCart)
route.get('/carts/:id', cartController.userCartId)
route.post('/carts/:id', cartController.userCartAddItem)
route.put('/carts/:id/:items/:itemsid', cartController.userCartUpdateItem)
route.delete('/carts/:id/:items/:itemsid', cartController.userCartDeleteItem)











module.exports = router