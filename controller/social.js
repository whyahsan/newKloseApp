const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;

const keys = require('../config/keys');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((user, done) => {
    done(null, user.id);
});


passport.use(
    new LinkedinStrategy({
        clientID: keys.linkedin.clientID,
        clientSecret: keys.linkedin.clientSecret,
        callbackURL: 'https://klose.xyz/api/auth/linkedin/callback'
    }, (accessToken, refreshToken, profile, done) => {

        var user;

        if (profile.photos.length === 0) {

            user = ({
                name: profile.displayName,
                email: profile.emails,
                id: profile.id,
            })

        } else {

            user = ({
                name: profile.displayName,
                id: profile.id,
                image: profile.photos[0].value
            })

        }

        done(null, user);
    })
)

passport.use(
    new FacebookStrategy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: "https://klose.xyz/api/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email', 'profileUrl']
    }, async (accessToken, refreshToken, profile, done) => {

        var user;

        if (profile.photos.length === 0) {

            user = ({
                name: profile.displayName,
                email: profile.emails,
                id: profile.id,
            })

        } else {

            user = ({
                name: profile.displayName,
                id: profile.id,
                image: profile.photos[0].value
            })

        }

        done(null, user);

    })
)

