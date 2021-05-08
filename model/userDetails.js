const mongoose = require('mongoose');


const userDetails = new mongoose.Schema({

    qrcode: { type: String },
    usercustomurl: { type: String },
    kid: { type: String },
    name: { type: String },
    email: { type: String },

    profileimagepath: {
        type: String
    },


    summary: { type: String },
    jobtitle: { type: String },
    company: { type: String },
    city: { type: String },
    phone: { type: String },
    secondaryphonenumber: { type: String },

    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },

    github: { type: String },
    dribbble: { type: String },
    behance: { type: String },
    youtube: { type: String },
    medium: { type: String },
    codeopen: { type: String },
    tiktok: { type: String },
    instagram: { type: String },
    snapchat: { type: String },

    profileviewcount: { type: Number },

    profileview: [],

    notificationtimestamp: { type: String },

    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    fileattachment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'fileattachment'
        }
    ]
})
module.exports = mongoose.model('userdetails', userDetails);

