const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', (req, res) => {

    User.findOne({email:req.body.email})   
    .then(user=> {
        if(user){
            res.json({message:"Email already exists"});
        }
        else{

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                occupation: req.body.occupation
            })
        
            bcrypt.genSalt((err, salt) => {

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
                
            });


            // newUser
            //     .save()
            //     .then(user=> {
            //         res.json(user)
            //     })
            //     .catch(err=> {
            //         res.json(err)
            //     })

        }
        
    })

});

module.exports = router;