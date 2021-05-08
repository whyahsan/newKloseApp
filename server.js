const express = require('express');
const cors = require('cors');
const mongooes = require('mongoose');
const passport = require('passport');

const keys = require('./config/keys');
const routes = require('./routers/router');
const social = require('./routers/social');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./controller/social');

const app = express();

try {

    mongooes.connect(keys.mongooes.url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(console.log("connected to db"))
        .catch(err => console.log(err))

} catch (error) {
    return console.log(error);
}

// app.use(
//     coockieSession({
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         keys: [keys.cookies.cookiesKey]
//     })
// )


var corsOptions = {

    origin: "*",
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-reset-token', 'x-invite-token', 'x-api-key', 'x-www-form-urlencoded'],
    credentials: true

};


app.use(passport.initialize());
app.use(passport.session());


//to retrive all the server datas
app.use("/public", express.static('public'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// })

app.use(cors(corsOptions));


app.use('/', routes);
app.use('/', social)


const port = (process.env.PORT || 3000);
app.listen(port, console.log("listen at port", port));