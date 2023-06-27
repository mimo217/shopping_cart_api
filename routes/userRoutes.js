const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const itemController = require('../controllers/itemController')
const cartController = require('../controllers/cartController')


router.post('/user/register', userController.registerUser)
router.post('/user/login', userController.loginUser)
router.post('/user/profile', userController.profileUser)
router.post('/user/logout', userController.logoutuser)
router.get('/items', itemController.itemList)
router.get('/items/:id', itemController.itemId)
router.post('/carts', cartController.userCart)
router.get('/carts/:id', cartController.userCartId)
router.post('/carts/:id', cartController.userCartAddItem)
router.put('/carts/:id/:items/:itemsid', cartController.userCartUpdateItem)
router.delete('/carts/:id/:items/:itemsid', cartController.userCartDeleteItem)



module.exports = router