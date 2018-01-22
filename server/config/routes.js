var users= require('../controllers/users');
var passport= require('./passport');

module.exports= function(app) {
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params['0']);
    });

    app.post('/registry', users.registry);

    app.post('/login', users.login);

    app.post('/logout', users.logout);

    app.get('/session', users.userAuthenticated);

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login' 
    }));

    app.get('*', function(req, res) {
        res.render('index');
    });
};