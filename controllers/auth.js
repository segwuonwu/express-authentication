const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', (req, res) => {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(([user, created]) => {
        if (created) {
            console.log("User created");
            res.redirect('/');
        } else {
            console.log('Email already exist');
            res.redirect('/auth/signup');
        }
    }).catch(err => {
        console.log('🙀Error occured finding or creating user');
        console.log(err)
        res.redirect('/auth/signup');
    });
})

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}));


module.exports = router;