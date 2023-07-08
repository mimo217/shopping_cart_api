const Item = require('../models/item')


exports.itemList = async (req, res) => {
    try {
        const items = await Item.find()
        res.json(items)

    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}

exports.createItem = async (req, res) => {
    try {
        const item = new Item(req.body)
        await item.save()
        res.json(item)
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

exports.updateItem = async ( req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        if (!item) {
            return res.status(404).json({ message: 'Item not found' })
        }
        item.name = req.body.name || item.name
        item.description = req.body.description || item.description
        item.price = req.body.price || item.price
        item.quantity = req.body.quantity || item.quantity

        await item.save()

        res.json(item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteItem = async ( req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        if (!item) {
            console.log(req.params.id)
            return res.status(404).json({ message: 'Item not found' })
        }
        
        await Item.deleteOne({ _id: item._id })

        console.log(item)
        res.status(200).json({ message: 'Item deleted successfully', item: item })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}