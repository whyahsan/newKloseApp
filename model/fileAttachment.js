const mongoose = require('mongoose');

const fileAttachment = new mongoose.Schema({
    kid: { type: String },
    pdfattachment: [
        {
            pdftitle: { type: String },
            pdfpath: { type: String }
        }
    ],
    youtubeattachment: [
        {
            youtubeembadLinktitle: { type: String },
            youtubeembadLink: { type: String }
        }
    ],
    imageattachment: [
        {
            imagetitel: { type: String },
            imagepath: { type: String }
        }
    ],
    customlinks: [
        {
            customlinktitle: { type: String },
            customlinkurl: { type: String }
        }
    ]

})
module.exports = mongoose.model('fileattachment', fileAttachment);