const Transaction = require('../models/model.transaction')
module.exports={
    showlist(req, res){
        Transaction.find({
            user:localStorage.idUser
        })
        .populate('user')
        .populate('products')
        .exec()
        .then(data=>{
            res.send(data)
        }).catch(err=>res.send(err))
    }
}