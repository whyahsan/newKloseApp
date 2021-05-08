const mongooes = require('mongoose');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const User = require('../model/user');

var kloseId = ''

function randomKid() {
    return kloseId = Math.floor(10000000 + (99999999 - 10000000) * Math.random());
    // return kloseId = 64755985;
}


//send otp 
exports.send_otp = async (req, res, next) => {
    try {

        randomKid();

        const { mobile, email } = req.body;
        console.log("mobile number", mobile);
        console.log("email", email);
        var userData = '';
        const randomOtp = Math.floor(1000 + (9999 - 1000) * Math.random());
        // if (mobile !== undefined) {


        //     var sendMsgurl = `https://api.msg91.com/api/v5/otp?authkey=${keys.msg91.authkey}&template_id=${keys.msg91.template_id}&extra_param={}&mobile=91${mobile}&invisible=1&otp=${randomOtp}&otp_expiry=2`;

        //     const user = await User.findOneAndUpdate({ mobile: mobile }, { $set: { otp: randomOtp } }, { returnOriginal: false })

        //     if (!user) {

        //         const matchKid = await User.findOne({ kid: kloseId })
        //         if (!matchKid) {

        //             const users = await new User({
        //                 _id: new mongooes.Types.ObjectId(),
        //                 mobile: mobile,
        //                 otp: randomOtp,
        //                 kid: kloseId
        //             })

        //             users.save()

        //             // await axios.get(sendMsgurl)
        //             //     .then(data => {
        //             //         return res.status(200).json({
        //             //             data: mobile,
        //             //         })
        //             //     })
        //             //     .catch(err => {
        //             //         return console.log(err);
        //             //     })

        //             console.log(randomOtp);
        //             return res.send({ status: 200, data: mobile })

        //         } else {
        //             // console.log("datas");
        //             return randomKid();
        //         }

        //     } else {

        //         // await axios.get(sendMsgurl)
        //         //     .then(data => {
        //         //         return res.status(200).json({
        //         //             data: mobile,
        //         //         })
        //         //     })
        //         //     .catch(err => {
        //         //         return console.log(err);
        //         //     })

        //         console.log(randomOtp);
        //         return res.send({ status: 200, data: mobile })
        //     }
        // }

        if (email !== undefined) {

            const user = await User.findOneAndUpdate({ email: email }, { returnOriginal: false })

            if (!user) {
                const matchKid = await User.findOne({ kid: kloseId })
                if (!matchKid) {

                    const users = await new User({
                        _id: new mongooes.Types.ObjectId(),
                        email: email,
                        // otp: randomOtp,
                        kid: kloseId
                    })

                    users.save()
                    userData = users
                    console.log("new user", userData);
                    return res.send({ status: 200, data: userData })

                } else {
                    // console.log("datas");
                    return randomKid();
                }
            } else {
                userData = user
                console.log("old user", userData);
                return res.send({ status: 200, data: userData })
            }
        }

    } catch (e) {
        return console.log(e.message);
    }
}

//verify otp
exports.verify_otp = async (req, res, next) => {
    try {

        const { mobile, email, password, otp } = req.body;
        console.log(mobile, otp, password, email);
        console.log(email.length);
        console.log("otp", otp > 1);
        if (email > 1 === true) {
            console.log("hye");
        }
        // if (mobile !== undefined) {


        //     const getOtp = `https://api.msg91.com/api/v5/otp/verify?mobile=91${mobile}&otp=${otp}&authkey=${keys.msg91.authkey}`;
        //     await axios.post(getOtp)
        //         .then(data => {

        //         })
        //         .catch(err => {
        //             return console.log(err);
        //         })

        //     const user = await User.findOneAndUpdate({ mobile: mobile, otp: otp }, { $set: { otp: otp, } }, { returnOriginal: false })
        //         .populate('userDetailsData')

        //     if (user) {

        //         const token = jwt.sign({
        //             mobile: user.mobile,
        //             userid: user._id,
        //             kid: user.kid

        //         }, keys.jwtKey, {
        //             expiresIn: 30 * 24 * 60 * 60 * 1000,
        //         })

        //         return res.send({ msg: "user exist welcome", otp: user, token: token });

        //     } else {
        //         res.send({ status: 401, msg: 'otp not verify' })
        //     }
        // }
        // else if (email !== undefined) {
        //     const user = await User.findOneAndUpdate({ email: email, password: password }, { returnOriginal: false })
        //         .populate('userDetailsData')

        //     if (user) {

        //         const token = jwt.sign({
        //             email: user.email,
        //             userid: user._id,
        //             kid: user.kid

        //         }, keys.jwtKey, {
        //             expiresIn: 30 * 24 * 60 * 60 * 1000,
        //         })

        //         return res.send({ msg: "user exist welcome", otp: user, token: token });

        //     }
        // }

    } catch (error) {
        return console.log(error.message);
    }
}

//resend otp
exports.resend_otp = async (req, res) => {
    try {

        const mobile = req.body.mobile;
        const resendOtp = `https://api.msg91.com/api/v5/otp/retry?mobile=91${mobile}&authkey=${keys.msg91.authkey}`

        await axios.post(resendOtp)
            .then(data => {
                res.send({ data: data['data'] })
            })
            .catch(err => {
                console.log(err);
            })

    } catch (e) {
        return res.send({ msg: 'some error', error: e.message })
    }
}

// exports.getuser = async (req, res, next) => {
//     try {

//         const userForms = await User.findOne({ _id: req.user.userid }).populate('userDetailsData')
//         res.send({ status: 201, data: userForms });
//         return;

//     } catch (error) {
//         return res.send({ msg: "error occure", error: error.message })
//     }
// }