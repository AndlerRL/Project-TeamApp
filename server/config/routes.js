var users= require('../controllers/users');
var tasks= require('../controllers/tasks');
var resources= require('../controllers/resources');
var timeline= require('../controllers/timeline');
var chat= require('../controllers/chat');
var passport= require('./passport');
var multiparty= require('connect-multiparty')();

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

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.post('/tasks', tasks.Save);

    app.get('/tasks', tasks.getTasks);

    app.post('/tasks/finished', tasks.saveFinished, timeline.finishedTask);

    app.post('/conversation', chat.create_give_conversation);

    app.post('/resource', multiparty, resources.saveResource, timeline.sentResource);

    app.get('/resources/received', resources.getReceivedResources);

    app.get('/resources/sent', resources.getSentResources);

    app.get('/resource/:id_resource', resources.getDetailResource);

    app.get('/timeline', timeline.getTimeline);

    app.post('/message', chat.send_msg);

    app.get('/messages/general', chat.get_general_msgs);

    app.get('/messages/:id_chat', chat.get_private_msgs);

    app.get('*', function(req, res) {
        res.render('index');
    });
};