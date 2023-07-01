const Item = require('../models/item')

exports.itemList = async (req, res) => {
    try {
        const items = await Item.find()
        res.json(items)

    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}

exports.itemId = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        if (!item) {
            return res.status(400).json({ message: 'Item not found'})
        }
        res.json(item)

    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

exports.item = async (req, res) => {
    try {
        const item = new Item(req.body)
        await item.save()
        res.json(item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}