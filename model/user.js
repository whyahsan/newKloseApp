const mongooes = require('mongoose');
const Schema = mongooes.Schema

const users = new Schema({
    mobile: { type: Number },
    email: { type: String },
    password: { type: String },
    otp: { type: Number },
    kid: { type: Number },
    usercustomurl: { type: String },
    userDetailsData: [
        {
            type: Schema.Types.ObjectId,
            ref: 'userdetails'
        }
    ],
})
module.exports = mongooes.model('users', users);