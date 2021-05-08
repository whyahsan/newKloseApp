const express = require('express');
const routers = express.Router();
const authCheck = require('../middleware/auth-check');

//file upload middleware
const fileupload = require('../middleware/file_upload');

//file Attachment model
const fileAttachment = require('../controller/fileAttachment');

//msg91 routes
const userController = require('../controller/user');

//user form routers ahsan
const userDetailsController = require('../controller/userDetails');


routers.post('/send', userController.send_otp);

routers.post('/verify', userController.verify_otp);

routers.post('/resend', userController.resend_otp);

// routers.get('/getuser', authCheck, userController.getuser);

routers.post('/forms', authCheck, fileupload, userDetailsController.user_post);


//router for profile
routers.post('/userprofile', authCheck, fileupload, userDetailsController.profile_update);

routers.get('/qrcode', authCheck, userDetailsController.get_qrode);

routers.get('/userdetails', authCheck, userDetailsController.user_details_data_get);

routers.get('/publicprofile/:id', userDetailsController.public_profile_get);


//router for image upload
routers.post('/imageupload', authCheck, fileupload, userDetailsController.image_upload);

//router for social image upload
routers.post('/social/imageupload', authCheck, userDetailsController.image_upload_socail);

//socail data router 
routers.post('/socail/profile', authCheck, fileupload, userDetailsController.social_data_post);


//customUrl
routers.post('/customurl', authCheck, userDetailsController.post_customurl);


//file uploads routers
routers.post('/file/upload', authCheck, fileupload, fileAttachment.file_post_and_update)

//file get router
routers.get('/file/get', authCheck, fileAttachment.file_get);

//file delete router
routers.post('/file/delete', authCheck, fileAttachment.file_delete);

//custumlink update router
routers.post('/file/update', authCheck, fileAttachment.customlinks_upadte);

//profile view count
routers.post('/profile/view/count/:id', userDetailsController.profile_view_count);

//geoloaction api post
routers.post('/geoloaction/api/:id', userDetailsController.geolocation_api_post);

//post notification timestamp
routers.post('/notification/timestapm', authCheck, userDetailsController.post_notification_timestamp);

//vcard router
routers.get('/vcard/:id', userDetailsController.vacrd_data);

//redis get api data
// routers.get('/redis/:id', userDetailsController.get_redish);

//get user data 
routers.get('/user/data/:id', userDetailsController.user_get_msg91);

module.exports = routers;