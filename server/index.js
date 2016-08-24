var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var massive = require('massive');
var connectionString = 'postgres://postgres@localhost/musictogether';
var passport = require('passport');
var session = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys');
var app = module.exports = express();







///////////////////FB AUTH/////////////////////

app.use(session({
    secret: 'blue orange red head'
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../public'));


var massiveInstance = massive.connectSync({
  connectionString: connectionString
});

app.set('db', massiveInstance);
var db = app.get('db');

//passport uses cookies
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: keys.facebookKey,
    clientSecret: keys.FacebookStrategy,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['displayName', 'email']
}, function(token, refreshToken, profile, done) {


    return db.parent.findOne({facebook_id: profile.id}, function (err, user) {
      if (user) {
        // only return when there was a found user
        return done(null, user);
      }
      else {
        db.parent.insert({facebook_id: profile.id, name: profile.displayName}, function (err, newUser) {
          // only return if it is returning
          return done(null, newUser);
        });
      }
    });


}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  //NEED TO MAKE SO AFTER NEWUSER FALSE REROUTE TO MYACCOUNT

    successRedirect: '/#/accountSetup',
    failureRedirect: '/auth/facebook'
}), function(req, res) {
    console.log(req.user);
});


passport.serializeUser(function(user, done) {
    done(null, user);
});

//puts user on req
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});




app.get('/me', function(req, res) {
    res.status(200).json(req.user);
});




var create = require ('./controller/create');
var read = require('./controller/read');
var update = require('./controller/update');
var _delete = require('./controller/update');



//GET ENDPOINTS
app.get('/classSchedule', read.getSchedule);
app.get('/mykids/:id', read.getCurrentUserKids);

//POST ENDPOINTS
app.post('/updateUser', create.postUser);
app.post('/mailinglist', create.postEmail);

//PUT
app.put('/addToCourse', update.addToClass);




var port = 3000;
app.listen(port, function(){
  console.log('listening on port ' + port);
});
