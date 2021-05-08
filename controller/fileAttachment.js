const fileAttachment = require('../model/fileAttachment');
const userDetails = require('../model/userDetails');

exports.file_post_and_update = async (req, res) => {

    try {

        const user = await fileAttachment.findOne({ kid: req.user.kid });

        if (!user) {
            const filedata = await new fileAttachment(
                {
                    kid: req.user.kid,
                }
            )

            const userformdata = await userDetails.findOne({ kid: req.user.kid });
            filedata.userDetails = userformdata;
            await filedata.save();
            userformdata.fileattachment.push(filedata);
            await userformdata.save();

            if (req.files !== undefined) {

                const { image, file } = req.files;

                if (file !== undefined) {
                    const { pdftitle } = req.body;

                    if (pdftitle === undefined) {
                        return;
                    }

                    const data = await fileAttachment.findOneAndUpdate({ kid: req.user.kid }, {
                        $addToSet: {
                            pdfattachment: {
                                pdftitle: pdftitle,
                                pdfpath: file[0].location
                            }
                        }
                    })

                    res.send({ status: 201, data: data })

                }
                if (image !== undefined) {

                    const { phototitle } = req.body;

                    const data = await fileAttachment.findOneAndUpdate({ kid: req.user.kid }, {
                        $addToSet: {
                            imageattachment: {
                                imagetitel: phototitle,
                                imagepath: image[0].location
                            }
                        }
                    })

                    res.send({ status: 201, data: data })

                }

            } else {

                const { youtubeembadlink, customlinkurl, customlinktitle, youtubeembadLinktitle } = req.body;

                if (youtubeembadlink !== undefined) {
                    const data = await fileAttachment.findOneAndUpdate({ kid: req.user.kid }, {
                        $addToSet: {
                            youtubeattachment: {
                                youtubeembadLinktitle: youtubeembadLinktitle,
                                youtubeembadLink: youtubeembadlink
                            }
                        }
                    })

                    res.send({ status: 201, data: data })

                } else if (customlinkurl !== undefined) {

                    const data = await fileAttachment.findOneAndUpdate({ kid: req.user.kid }, {
                        $addToSet: {
                            customlinks: {
                                customlinktitle,
                                customlinkurl,
                            }
                        }
                    })

                    res.send({ status: 201, data: data })

                }
            }

        } else {

            if (req.files !== undefined) {

                const { image, file } = req.files;
                if (file !== undefined) {

                    const { pdftitle } = req.body;

                    if (pdftitle === undefined) {
                        return;
                    }

                    const data = await fileAttachment.findOneAndUpdate({ kid: req.user.kid }, {
                        $addToSet: {
                            pdfattachment: {
                                pdftitle: pdftitle,
                                pdfpath: file[0].location
                            }
                        }
                    })

                    res.send({ status: 201, data: data })

                }
                if (image !== undefined) {

                    const { phototitle } = req.body;

                    const data = await fileAttachment.findOneAndUpdate({ kid: req.user.kid }, {
                        $addToSet: {
                            imageattachment: {
                                imagetitel: phototitle,
                                imagepath: image[0].location
                            }
                        }
                    })

                    res.send({ status: 201, data: data })

                }
            } else {

                const { youtubeembadlink, customlinkurl, customlinktitle, _id, youtubeembadLinktitle } = req.body;

                if (youtubeembadlink !== undefined) {

                    const data = await fileAttachment.findOneAndUpdate({ kid: req.user.kid }, {
                        $addToSet: {
                            youtubeattachment: {
                                youtubeembadLinktitle: youtubeembadLinktitle,
                                youtubeembadLink: youtubeembadlink
                            }
                        }
                    })

                    res.send({ status: 201, data: data })

                }
                else if (customlinkurl !== undefined) {

                    const data = await fileAttachment.findOneAndUpdate({ kid: req.user.kid }, {

                        $addToSet: {
                            customlinks: {
                                customlinktitle,
                                customlinkurl,
                            }
                        }
                    })

                    res.send({ status: 201, meg: data })

                }
            }
        }
    } catch (error) {
        return console.log("file upload error", error.message);
    }
}

exports.customlinks_upadte = async (req, res) => {
    try {

        const { customlinkurl, customlinktitle, _id } = req.body;

        if (customlinkurl !== undefined) {

            const data = await fileAttachment.updateOne({ kid: req.user.kid, "customlinks._id": _id }, {
                $set: {
                    "customlinks.$.customlinktitle": customlinktitle,
                    "customlinks.$.customlinkurl": customlinkurl,
                }
            })

            res.send({ status: 201, meg: data })

        }
    } catch (error) {
        return console.log(error.message);
    }
}
exports.file_get = async (req, res) => {
    try {

        const fileData = await fileAttachment.findOne({ kid: req.user.kid })

        if (fileData) {
            res.send({ status: 201, data: fileData })
        } else {
            res.send({ status: 301, msg: fileData })
        }

    } catch (error) {
        return console.log(error.message);
    }
}
exports.file_delete = async (req, res) => {
    try {

        if (req.body !== undefined) {

            const { pdftitle, pdfpath, _id, imagepath, imagetitle, youtubeembadLink, customlinkurl } = req.body;

            if (pdfpath !== undefined) {

                const pdfDeleted = await fileAttachment.updateOne({ kid: req.user.kid },
                    {
                        $pull: {
                            pdfattachment: {
                                _id,
                            }
                        }
                    })

                res.send({ status: 201, data: pdfDeleted })

            }
            else if (imagepath !== undefined) {

                const imageDeleted = await fileAttachment.updateOne({ kid: req.user.kid },
                    {
                        $pull: {
                            imageattachment: {
                                _id,
                            }
                        }
                    })

                res.send({ status: 201, data: imageDeleted })

            }
            else if (youtubeembadLink !== undefined) {

                const linkDeleted = await fileAttachment.updateOne({ kid: req.user.kid },
                    {
                        $pull: {
                            youtubeattachment: {
                                _id,
                            }
                        }
                    })

                res.send({ status: 201, data: linkDeleted })

            } else if (customlinkurl !== undefined) {

                const linkDeleted = await fileAttachment.updateOne({ kid: req.user.kid },
                    {
                        $pull: {
                            customlinks: {
                                _id,
                            }
                        }
                    })

                res.send({ status: 201, data: linkDeleted })

            }
        }

    } catch (error) {

        res.send({ status: 401, data: 'data not deleted' })
        return console.log(error.message);

    }
}
