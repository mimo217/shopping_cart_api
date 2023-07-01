const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')

router.post('/', itemController.item)
router.get('/', itemController.itemList)
router.get('/:id', itemController.itemId)

module.exports = router