const Item = require('../models/model.items')
module.exports={
    listItem (req, res){
        Item.find().then(data=>{
            res.send({
                message : 'list Item',
                data
            })
        })
    },
    addItem (req, res){
        console.log('aaaaaaa')
        Item.create({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            image: req.file.cloudStoragePublicUrl,
        }).then(data=>{
            res.send(data)
        }).catch(err=>res.send(err))
    },
    editItem(req, res){
        Item.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
        }).then(data=>{
            res.send({
                message:'updated',
                data
            })
        }).catch(err=>res.send(err))
    },
    removeItem (req, res){
        Item.findByIdAndRemove(req.params.id).then(data=>{
            res.send({
                message : 'deleted',
                data
            })
        })
    }
}