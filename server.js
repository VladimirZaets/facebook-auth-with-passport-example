import config from './config';
import express from 'express';
import bodyParser from 'body-parser';
import router from './router';
import passport from 'passport';
import session from 'express-session';
import passportFacebook from 'passport-facebook';

const app = express();
let FacebookStrategy = passportFacebook.Strategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj)); 
passport.use(new FacebookStrategy({
  		clientID: config.social.facebook.clientID,
  		clientSecret: config.social.facebook.clientSecret,
  		callbackURL: config.social.facebook.callbackURL,
  		profileFields: [
  			'id', 
  			'displayName', 
  			'picture', 
  			'first_name', 
  			'last_name', 
  			'email'
  		]
	},
	(accessToken, refreshToken, profile, done) => 
		process.nextTick(() => done(null, profile))
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'session' }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);
app.set('port', process.env.PORT || config.server.port || 3000);
app.listen(app.get('port'), () => 
	console.info(`Server started on port ${ app.get('port') }`)
);