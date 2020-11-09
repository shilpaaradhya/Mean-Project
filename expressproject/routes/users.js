var express = require('express');
var router = express.Router();
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


router.post('/signup', (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                role: req.body.role
            })
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "user created",
                        result: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                })
        });
});


router.post('/login', (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: " Auth Failed "
                });
            }
            if (user) {
                console.log(user)
            }
            fetchedUser = user
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            console.log(result);
            if (!result) {
                console.log('hii')
                return res.status(401).json({
                    message: " Auth Failed "
                })
            }
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id, role: fetchedUser.role }, "secret_this_should_be_longer", { expiresIn: "1h" })
            res.status(201).json({
                token: token,
                userId: fetchedUser._id,
                role: fetchedUser.role
            })
            console.log(role)
        })
        .catch(err => {
            console.log(err)
            return res.status(401).json({
                message: " Auth Failed "
            })
        })
})






module.exports = router;