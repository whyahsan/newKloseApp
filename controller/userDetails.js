const userDetails = require('../model/userDetails');
const USER = require('../model/user');

const qrcode = require('qrcode');
const vCardsJS = require('vcards-js');
const Axios = require('axios');
const redis = require('redis');
const keys = require('../config/keys');
const redis_port = 6379;

const client = redis.createClient(redis_port);

// //redis testing port 
// exports.get_redish = (req, res, next) => {
//     try {
//         const id = req.params.id;
//         client.get(id, async (err, datas) => {
//             if (err) throw err;

//             if (datas) {
//                 res.send({
//                     datas: JSON.parse(datas),
//                     message: 'dara retrive form the cache'
//                 });
//             } else {
//                 const userData = await userDetails.findOne({ usercustomurl: id })
//                 client.setex(id, 600, JSON.stringify(userData));
//                 res.send({
//                     data: userData,
//                     msg: 'cache miss'
//                 })

//             }

//         })
//         // console.log(userData);
//         // res.send({ status: '200', data: userData })
//     } catch (error) {
//         console.log(error);
//     }
// }


//cutomurl for each user
exports.post_customurl = async (req, res, next) => {
    try {
        const kloseid = req.user.kid;
        const { usercustomurl, qrcode } = req.body.user;
        const userExist = await userDetails.findOne({ usercustomurl: usercustomurl });


        if (!userExist) {

            const userdatas = await userDetails.findOne({ kid: kloseid });

            if (userdatas.usercustomurl === undefined) {

                await userDetails.findOneAndUpdate({ kid: kloseid }, { $set: { usercustomurl, qrcode } });
                await USER.findOneAndUpdate({ kid: kloseid }, { $set: { usercustomurl } });
                res.send(JSON.stringify({ status: 200, msg: "new user", usercustomurl: usercustomurl, }));

            } else {
                res.send(JSON.stringify({ status: 300, msg: "try diffrent url", data: userdatas, }));
            }

        } else {
            res.send(JSON.stringify({ status: 400, msg: "user url exist", data: userExist, }));
        }
    } catch (error) {
        console.log("user post errors", error.message);
    }
}


//image upload 
exports.image_upload = async (req, res, next) => {
    try {

        const kloseid = req.user.kid;
        const { image } = req.files;
        var imagepaths = "";


        if (image === undefined) {
            imagepaths = null
        } else {
            for (var dataimage of image) {
                imagepaths = dataimage.location;
            }
        }


        const userExist = await userDetails.findOne({ kid: kloseid });
        if (userExist) {

            const user = await userDetails.findOneAndUpdate({ kid: kloseid }, {
                $set: { profileimagepath: imagepaths }
            });
            res.send({ status: 200, msg: "update image", data: user });

        }
    } catch (error) {
        return console.log("user post errors", error.message);
    }
}


//image upload  from socail data
exports.image_upload_socail = async (req, res, next) => {
    try {

        const kloseid = req.user.kid;
        const { image } = req.body;
        var imagepaths = "";

        if (image === undefined) {
            imagepaths = null
        } else {
            imagepaths = image
        }


        const userExist = await userDetails.findOne({ kid: kloseid });
        if (userExist) {

            const user = await userDetails.findOneAndUpdate({ kid: kloseid }, {
                $set: { profileimagepath: imagepaths }
            });
            res.send({ status: 200, msg: "update image", data: user });

        }
    } catch (error) {
        return console.log("user post errors", error.message);
    }
}


//edit profile update
exports.profile_update = async (req, res, next) => {
    try {
        const kloseid = req.user.kid;
        const {
            name,
            email,
            summary,
            jobtitle,
            company,
            city,
            phone,
            facebook,
            twitter,
            linkedin,
            github,
            instagram,
            dribbble,
            behance,
            youtube,
            medium,
            codeopen,
            snapchat,
            tiktok,
        } = req.body.user;


        const userExist = await userDetails.findOne({ kid: kloseid });
        if (userExist) {
            const user = await userDetails.findOneAndUpdate({ kid: kloseid }, {
                $set: {
                    name, email,
                    city,
                    jobtitle,
                    company,
                    summary,
                    phone,
                    facebook,
                    twitter,
                    linkedin,
                    github,
                    instagram,
                    dribbble,
                    behance,
                    youtube,
                    medium,
                    codeopen,
                    snapchat,
                    tiktok,
                }
            });
            res.send({ status: 200, msg: "user update", data: user });
        }


    } catch (error) {
        return console.log("user post errors", error.message);
    }
}


//user profile create
exports.user_post = async (req, res, next) => {
    try {
        const kloseid = req.user.kid;
        const { name, email, jobtitle, company, city, phone, qrcode } = req.body.user;
        const userExist = await userDetails.findOne({ kid: kloseid });
        if (!userExist) {

            const user = new userDetails(
                {
                    kid: kloseid,
                    qrcode,
                    name,
                    email,
                    jobtitle,
                    company,
                    city,
                    phone: req.user.mobile || phone,
                }
            )

            const userData = await USER.findOne({ mobile: req.user.mobile })
            await user.save();
            userData.userDetailsData.push(user);
            await userData.save();
            res.send({ status: 200, msg: "new user", data: user, });

        }
        else {

            // const user = await userDetails.findOneAndUpdate({ kid: kloseid }, {
            //     $set: {
            //         name,
            //         city,
            //         jobtitle,
            //         company,
            //     }
            // });

            res.send({ status: 200, msg: "user exist", data: user });

        }
    } catch (error) {
        return console.log("user post errors", error.message);
    }
}


//data from facebook and linkedIn
exports.social_data_post = async (req, res, next) => {
    try {

        const kloseid = req.user.kid;
        const { image } = req.files;
        const { name, email, jobtitle, company, city, qrcode } = req.body;
        var imagepaths = "";


        if (image === undefined) {
            imagepaths = req.body.image
        } else {
            for (var dataimage of image) {
                imagepaths = dataimage.location;
            }
        }


        const userExist = await userDetails.findOne({ kid: kloseid });
        if (!userExist) {

            const user = new userDetails(
                {
                    kid: kloseid,
                    qrcode,
                    name,
                    email,
                    profileimagepath: imagepaths,
                    jobtitle,
                    company,
                    city,
                    phone: req.user.mobile,
                }
            )

            const userData = await USER.findOne({ mobile: req.user.mobile })
            await user.save();
            userData.userDetailsData.push(user);
            await userData.save();
            res.send({ status: 200, msg: "new user social data", data: user, });

        } else {

            res.send({ status: 203, msg: 'user exist', data: userExist })

        }
    } catch (error) {
        return console.log("user post errors social data", error.message);
    }
}


// ganrate Qrcode 
exports.get_qrode = async (req, res, next) => {
    try {
        await userDetails.find({ kid: req.user.kid }, (err, data) => {

            if (data != '') {

                let temp = [];

                for (let i = 0; i < data.length; i++) {
                    // let name = { data: data[i].name };
                    // temp.push(name);

                    // let email = { data: data[i].email };
                    // temp.push(email);

                    // let summary = { data: data[i].summary };
                    // temp.push(summary);

                    // let jobtitle = { data: data[i].jobtitle };
                    // temp.push(jobtitle);

                    // let company = { data: data[i].company };
                    // temp.push(company);

                    // let city = { data: data[i].city };
                    // temp.push(city);

                    // let phone = { data: data[i].phone };
                    // temp.push(phone);

                    let qrcode = { data: data[i].qrcode };
                    temp.push(qrcode);

                }

                qrcode.toDataURL(temp, { errorCorrectionLevel: 'H' }, (err, url) => {
                    res.send({ status: 201, data: url });
                })

            }
        })
    } catch (error) {
        return console.log(error.message);
    }
}


//get user profile data
exports.user_details_data_get = (req, res, next) => {
    try {
        const kid = req.user.kid;
        client.get(kid, async (err, datas) => {
            if (err) throw err;

            if (datas) {
                // console.log(datas);
                res.send({
                    data: JSON.parse(datas),
                    message: 'dara retrive form the cache'
                    // status: 200, data: userDataGet
                })
            } else {
                const userDataGet = await userDetails.findOne({ kid: kid })
                    .populate('fileattachment')
                client.setex(kid, 600, JSON.stringify(userDataGet));
                res.send({ status: 201, data: userDataGet })

            }

        })


    } catch (error) {
        console.log(error.message);
    }
}


//post notification timestamp
exports.post_notification_timestamp = async (req, res, next) => {
    try {
        // console.log(req.body);
        const userDataGetEdit = await userDetails.findOneAndUpdate({ kid: req.user.kid }, { $set: { notificationtimestamp: req.body.notificationtimestamp } })

        res.send({ status: 201, data: 'count update' })
    } catch (error) {
        return console.log(error.message);
    }
}


//route for public profile get data
exports.public_profile_get = async (req, res, next) => {
    try {

        var id = req.params.id;

        const userDataGetEdit = await userDetails.findOne({ usercustomurl: id })
            .populate('fileattachment')

        res.send({ status: 201, data: userDataGetEdit })

    } catch (error) {
        return console.log(error.message);
    }
}


//count profile view
exports.profile_view_count = async (req, res, next) => {
    try {

        var id = req.params.id;

        const userDataGetEdit = await userDetails.findOne({ usercustomurl: id })
            .populate('fileattachment')

        var count = userDataGetEdit.profileviewcount;
        if (count === undefined) {
            count = 1;
        }
        else if (count !== undefined) {
            count++;
        }
        await userDetails.findOneAndUpdate({ usercustomurl: id }, { $set: { profileviewcount: count } })

        res.send({ status: 201, data: 'count update' })

    } catch (error) {
        return console.log(error.message);
    }
}


//geo loaction data post
exports.geolocation_api_post = async (req, res, next) => {

    try {

        var id = req.params.id;
        var userdata = req.body.userdata;
        var location

        // console.log("line  340", userdata);

        if (userdata.latitude !== undefined && userdata.longitude !== undefined) {

            await Axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${userdata.latitude}+${userdata.longitude}&key=${keys.geo_loaction}`)
                .then(data => {
                    if (data.data.results[0].components.city !== undefined) {

                        location = {
                            "city": data.data.results[0].components.city,
                            "country": data.data.results[0].components.country
                        }
                    }
                    else if (data.data.results[0].components.village !== undefined) {
                        location = {
                            "state": data.data.results[0].components.state,
                            "country": data.data.results[0].components.country
                        }
                    }
                    else {
                        res.send({ status: 303, msg: 'location not found' })
                        console.log("location not found");
                    }
                    // console.log(location);

                })
                .catch(err => {
                    console.log(err);
                })
        }

        await userDetails.findOne({ usercustomurl: id })
            .then(async (data) => {

                var query = { usercustomurl: id, 'profileview.slug': userdata.slug };

                if (userdata.slug !== undefined && userdata.latitude !== undefined && userdata.longitude !== undefined) {

                    var data = await userDetails.findOne(query)
                    if (!data) {
                        await userDetails.updateOne({ usercustomurl: id }, {
                            $push: {
                                profileview: {
                                    location: location,
                                    slug: userdata.slug,
                                    username: userdata.username,
                                    currantDate: userdata.currantDate,
                                }
                            }
                        })
                    } else {
                        const data = await userDetails.updateOne({ usercustomurl: id, 'profileview.slug': userdata.slug }, {
                            $set: {
                                'profileview.$.location': location,
                                'profileview.$.username': userdata.username,
                                'profileview.$.currantDate': userdata.currantDate,
                            }
                        })
                    }


                } else if (userdata.username !== undefined && location === undefined) {
                    var data = await userDetails.findOne(query)
                    if (!data) {
                        await userDetails.updateOne({ usercustomurl: id }, {
                            $push: {
                                profileview: {
                                    location: location,
                                    slug: userdata.slug,
                                    username: userdata.username,
                                    currantDate: userdata.currantDate,
                                }
                            }
                        })
                    } else {
                        const data = await userDetails.updateOne({ usercustomurl: id, 'profileview.slug': userdata.slug }, {
                            $set: {
                                'profileview.$.location': location,
                                'profileview.$.username': userdata.username,
                                'profileview.$.currantDate': userdata.currantDate,
                            }
                        })

                    }


                } else if (userdata.username === undefined && location !== undefined) {
                    const data = await userDetails.findOne({ usercustomurl: id })
                    if (data) {
                        await userDetails.updateOne({ usercustomurl: id }, {
                            $push: {
                                profileview: {
                                    // slug: userdata.slug,
                                    // username: userdata.username,
                                    location: location,
                                    currantDate: userdata.currantDate,
                                }
                            }
                        })
                    }
                }
            })
            .catch(err => {
                return console.log(err);
            })

    } catch (error) {
        return console.log(error);
    }
}


//msg91 get router
exports.user_get_msg91 = async (req, res, next) => {
    try {

        var id = req.params.id;
        // var { email } = req.body;
        console.log("req.parems", req.params.id);
        const userData = await USER.findOne({ email: id })
        console.log(userData);
        return res.send({ status: 201, data: userData });

    } catch (error) {
        return console.log(error.message);
    }
}


exports.vacrd_data = async (req, res) => {
    try {

        const id = req.params.id;
        const user = await userDetails.findOne({ usercustomurl: id })
        if (user) {


            var vCard = vCardsJS();

            //set properties
            vCard.firstName = user.name;
            vCard.organization = user.company;
            vCard.homePhone = user.phone;
            vCard.email = user.email;
            vCard.socialUrls['facebook'] = user.facebook;
            vCard.socialUrls['linkedIn'] = user.linkedin;
            vCard.socialUrls['twitter'] = user.twitter;

            res.set('Content-Type', `text/vcard; name=${id}.vcf`);
            res.set('Content-Disposition', `inline; filename=${id}.vcf`);

            //send the response
            res.send(vCard.getFormattedString());

        } else {

            res.send({ status: 300, msg: 'no data', data: user })

        }
    } catch (error) {
        return console.log("error", error.message);
    }
}
