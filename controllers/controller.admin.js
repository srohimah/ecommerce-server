const Admin = require('../models/model.admin')
const token = require('../middleware/auth')
const has = require('../middleware/hash')

module.exports = {
    signIn (req, res){
            Admin.findOne({email : req.body.email}).then(dataAdmin=>{
                if(dataAdmin){
                    if(has.compare(req.body.password, dataAdmin.password)){    
                        token.generate({id:dataAdmin._id,name:dataAdmin.name, name:dataAdmin.email}, (token) => {
                            res.status(200).json({
                                message: 'logged in',
                                dataAdmin,
                                token
                            })
                        })
                        
                    }else{
                        res.status(404).json({
                            message: 'password is incorect'
                        })
                    }
                }else{
                    res.status(404).json({
                        message: 'email is incorect'
                    })
                }
            }).catch(err=>{
                res.send(err)
            })
    },
    signUp (req, res){
        Admin.findOne({email : req.body.email}).then(dataAdmin=>{
            if(dataAdmin){
                res.send({
                    message:'email has been used'
                })
            }else{
                let {name, email, password} = req.body
                let admin = new Admin({
                    name,
                    email,
                    password
                })
                admin.save().then(data=>{
                    res.send({
                        message : 'new admin created',
                        data
                    })
                })
            }
        })
    }
}