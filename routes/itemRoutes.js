const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')


router.get('/items', itemController.itemList)
router.get('/items/:id', itemController.itemId)

module.exports = router