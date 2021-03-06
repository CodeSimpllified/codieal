const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    User.findById(jwtPayLoad._id, function(error, user){
        if(error){
            console.log('Error in finding user from JWT');
            return;
        }
        // console.log('Well Authenticatio working till now');
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    });
}));

module.exports = passport;