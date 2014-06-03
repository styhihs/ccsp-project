var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: "/fbcb"
}, function(accessToken, refreshToken, profile, done){
  // Passport profile:
  // http://passportjs.org/guide/profile/
  // Once the profile is stored in session, it will be available in req.user.
  //
  done(null, profile);
}));


// Extract needed data from Passport profile object.
// For this app, we only need to know user.id.
//
// Required by Passport.
// Ref: https://github.com/jaredhanson/passport#sessions
//
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Returns user object from facebook id.
//
// Required by Passport.
// Ref: https://github.com/jaredhanson/passport#sessions
//
passport.deserializeUser(function(id, done) {
  done(null, {id: id});
});