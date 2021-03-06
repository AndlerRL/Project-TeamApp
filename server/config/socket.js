var _= require('lodash');
var users= [];

module.exports= (server)=> {
   var io= require('socket.io')(server);

   io.on('connection', function(socket) {
      socket.on('new:task', function(data) {
         io.emit('new:action', data);
      });

      socket.on('new:resource', function(data) {
         io.emit('new:action', [data]);
      });

      socket.on('disconnect', function() {
         console.log('User disconnect', socket.id);

         var list= _.reject(users, function(user) {
           return user.socket === socket.id;
         });
         socket.emit('users:list', users);
      });

      socket.on('new:user', function(data) {
         var index= _.findIndex(users, { _id : data.user._id });

         if (index > -1) {
            users[index].socket= socket.id;
         } else {
            users.push({
               _id: data.user._id,
               socket: socket.id,
               name: data.user.name,
               nick: data.user.username
            });
         }

         console.log("Users Connected: \n", users);
         socket.broadcast.emit('users:list', users);
      });

      socket.on('new:msg:general', function(msg) {
        io.emit('msg:general', msg);
      });

      socket.on('new:msg:private', function(msg) {
        var index= _.findIndex(users, { _id: msg.receiver._id});
        if (index > -1) {
          socket.broadcast.in(users[index].socket).emit('msg:private', msg);
        } //maybe here the ToastService????
      });

      socket.on('users', function(data) {
         socket.emit('users:list', users);
      });
   });
};