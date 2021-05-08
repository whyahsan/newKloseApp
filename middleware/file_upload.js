const multer = require('multer');
const aws = require('aws-sdk')
const config = require('../config/keys')
const multerS3 = require('multer-s3');
// const { image_upload } = require('../controller/userForm');


const s3 = new aws.S3({
    accessKeyId: config.aws_s3.Access_Key_ID,
    secretAccessKey: config.aws_s3.Secret_Access_Key,
    region: 'ap-south-1',
});



// const limites = (req, res) => {
//     limits(req, res, (err) => {
//         if (err) {
//             // console.log("error", err);
//             res.send({ status: 300, msg: "image size to large" })
//             return
//         }
//         res.send({ status: 200, msg: 'file upload' })
//     }
//     )
// }

var limits = {
    files: 1, // allow only 1 file per request
    fileSize: 1024 * 100, // 1 MB (max file size)
};

const storage = multer.diskStorage({
    // destination: 'client/src/uploads/image',
    destination: 'public/images',
    // destination: function (req, file, cb) {
    //     cb(null, './uploads/image/');
    // },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});


const fileFilters = function (req, file, cb) {

    if (file.fieldname === 'image') {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype == "image/png") {

            cb(null, true);
        } else {

            cb(null, false)
        }
    } else if (file.fieldname === 'file') {

        if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/vnd.oasis.opendocument.text") {

            cb(null, true);
        } else {

            cb(null, false)
        }
    } else {
        cb(null, false);
    }
}
const upload = multer(
    {
        // storage: storage,

        storage: multerS3({

            s3: s3,
            bucket: config.aws_s3.bucketname,
            acl: 'public-read',

            key: function (req, file, cb) {
                cb(null, Date.now().toString())
            },

            contentType: multerS3.AUTO_CONTENT_TYPE
        }),

        fileFilter: fileFilters,

        limits: { fileSize: 1024 * 1024 * 10 }

    }
)


const fileupload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }]);
module.exports = fileupload;

// module.exports = (req, res) => {
//     // handling multer Errors
//     fileupload(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             // console.log("error", err);
//             res.send({ status: 300, msg: "image size to large" })
//             return
//         } else if (err) {
//             console.log("err");
//             return
//         }
//         res.send({ status: 200, msg: 'file upload' })
//         console.log("upload");
//     })
// }
// key: function (req, file, cb) {
//     cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
// },
// metadata: function (req, file, cb) {
//     cb(null, { fieldName: file.fieldname });
// },
// key: function (req, file, cb) {
//     cb(null, Date.now().toString())
// },


// aws.config.update({
//     secretAccessKey: config.aws_s3.Secret_Access_Key,
//     accessKeyId: config.aws_s3.Access_Key_ID,
//     region: 'us-east-2'
// })

// module.exports = (req, res) => {
//     fileupload(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             res.send({ status: "300", msg: "image size is to large" })
//             console.log("multer error", err);
//         } else if (err) {
//             console.log("some other error", err);
//             // res.send({ status: "400", msg: 'some other error' })
//         }
//         res.send({ status: "200", msg: "file uploade" })
//     })
// }

