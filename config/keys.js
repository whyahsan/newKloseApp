require('dotenv').config();
module.exports = {
    port: process.env.PORT,
    mongooes: {
        url: process.env.MONGOD_DB,

    },
    msg91: {
        otp: process.env.OTP,
        authkey: process.env.MSG91_API_KYE,
        template_id: process.env.MSG91_TAMPLATE,
    },
    cookies: {
        cookiesKey: process.env.COOKIES_KEY,
    },
    facebook: {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,

    },
    linkedin: {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    },
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSceret: process.env.GOOGLE_CLIENT_SECRET
    },
    aws_s3: {
        Access_Key_ID: process.env.AWS_S3_ACCESS_KEYS_ID,
        Secret_Access_Key: process.env.AWS_S3_SECRET_ACCESS_KEY,
        bucketname: process.env.AWS_S3_BUCKETNAME

    },
    jwtKey: process.env.JWT_KWY,
    refreshJwtKey: process.env.REFRESH_JWT_KEY,

    geo_loaction: process.env.GEO_LOCATION

}