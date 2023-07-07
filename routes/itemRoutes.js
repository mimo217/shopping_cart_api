const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')

router.get('/', itemController.itemList)
router.post('/', itemController.createItem)
router.get('/:id', itemController.itemId)
router.put('/:id', itemController.updateItem)
router.delete('/:id', itemController.deleteItem)

module.exports = router