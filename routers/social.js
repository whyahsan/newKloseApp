const passport = require('passport');
const routes = require('express').Router();
const config = require('../config/config');


routes.get('/auth/facebook', passport.authenticate('facebook'));

routes.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {

    var socialData = req.user;
    var jsonData = JSON.stringify(socialData);

    res.cookie('profile', jsonData)
    res.redirect(`${config.urlport}/signup/form/`)

});


routes.get('/auth/linkedin', passport.authenticate('linkedin'));

routes.get('/auth/linkedin/callback', passport.authenticate('linkedin'), (req, res) => {

    var socialData = req.user;
    var jsonData = JSON.stringify(socialData)

    res.cookie('profile', jsonData)
    res.redirect(`${config.urlport}/signup/form/`)

});


module.exports = routes;