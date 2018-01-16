import express from 'express';
import passport from 'passport';

let router = express.Router();

router.get('/', 
	(req, res) => res.json({description: 'Facebook auth with passport example.'})
);
router.get('/auth/facebook', 
	passport.authenticate('facebook', {scope: ['public_profile', 'email']})
);
router.get('/auth/facebook/callback', 
	passport.authenticate('facebook'), 
	(req, res) => res.redirect('/account')
);
router.get('/account', 
	(req, res, next) => req.isAuthenticated() ? next() : res.redirect('/'), 
	(req, res) => res.json({user: req.user})
);

export default router;