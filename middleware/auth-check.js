const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {

    const authHeader = req.headers.Authorization || req.query.authorization || req.headers.authorization || req.headers['authorization'] || req.headers['Authorization'];

    try {
        if (authHeader) {

            const token = authHeader.split(' ')[1];

            jwt.verify(token, keys.jwtKey, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next()
            });

        } else {
            res.sendStatus(401);
        }

    } catch (error) {
        return console.log(error.message);
    }
}