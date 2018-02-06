var app= angular.module('Teamapp');

app.controller('chatCtrl', function($scope, $stateParams, $state, Socket, Session, ChatService, ToastService) {
   $scope.users_connected= [];
   $scope.chat= null;
   $scope.msgsList= [];
   $scope.msg= "";

   $scope.msgsG= [];
   $scope.msgsP= [];

   if ($scope.users_connected.length <= 0) {
      Socket.emit('users');
   }

   $scope.sendGeneralMsg= function() {
      Session.getUser().then(function(response) {
         var data= {};
         var username= response.data.user.user.username;
         data= {
            content: $scope.msg,
            type: 'general',
            username: username,
            date: new Date()
         };
         ChatService.sendMsg(data).success(function(response) {
            $scope.msgsList[$scope.chat]= $scope.msgsG;
            data.sender= response.msgs[0].username;
            $scope.setChat(data);
            Socket.emit('new:msg:general', data);
            $scope.msg= "";
         }).error(function(response) {
            console.error(response);
         });
      });
   }

   $scope.sendPrivateMsg= function() {
      Session.getUser().then(function(response) {
         var data= {};
         var username= response.data.user.user.username;
         data= {
            content: $scope.msg,
            type: 'private',
            receiver: {
               _id: $scope.other._id.toString()
            },
            sender: {
               _id: $scope.I._id.toString()
            },
            chat: $scope.chat,
            date: new Date()
         };
         ChatService.sendMsg(data).success(function(response) {
            $scope.msgsList[$scope.chat]= $scope.msgsP;
            data.sender= response.msgs[0].sender;
            $scope.setChat(data);
            Socket.emit('new:msg:private', data);
            $scope.msg= "";
         }).error(function(response) {
            console.error(response);
         });
      });
   }

   $scope.goToChat= function(destiny) {
      ChatService.createGiveConversation({ receiver : destiny }).success(function(response) {
         if (response.chat.type == 'private') {
            $state.go('app.chat.private', { id_chat : response.chat._id });
            $scope.I= response.I;
            $scope.other= response.other;
         } else {
            $state.go('app.chat.general');
         }
      });
   }

   $scope.getChatType= function(callback) {
      var id= $state.params.hasOwnProperty('id_chat');
      if (id) {
         callback($state.params.id_chat);
      } else {
         callback("general");
      }
   }

   $scope.whereIam= function() {
      $scope.getChatType(function(type) {
         $scope.chat= type;
         if (typeof callback == "function") {
            callback($scope.chat);
         }
      });
   };

   $scope.getMsgs= function() {
      $scope.whereIam(function(chat) {
         if (chat == "general") {
            $scope.goToChat("general");
            ChatService.getGeneralMsgs().success(function(response) {
               console.log(response);
               $scope.msgsG= response[0].msgs;
            });
         } else {
            ChatService.getPrivateMsgs({ chat : $scope.chat }).success(function(response) {
               $scope.goToChat(response.other._id);
               _.each(response.chat.msgs, function(msg) {
                  msg.chat= response.chat._id;
               });
               $scope.msgsList[$scope.chat]= response.chat.msgs;
            })
         }
      });
   }();

   $scope.setChat= function(msg) {
      if ($scope.msgsList) {

         if (msg.chat && $scope.chat) {

            if ($scope.msgsList.hasOwnProperty(msg.chat)){
               $scope.msgsList[msg.chat].push(msg);
            } else {
               $scope.msgsList[msg.chat] = new Array();
               $scope.msgsList[msg.chat].push(msg);
            }
            console.log($scope.msgsList, $scope.chat, msg); //Optional...
         }
      }
   }

   $scope.getChatmsgs= function(list) {
      var msgs= list[$scope.chat];
      return msgs;
   }
   

   Socket.on('users:list', function(users) {
      Session.getUser().then(function(response) {
         var user= response.data.user.user;
         var connected= _.reject(users, { _id : user._id });
         angular.copy(connected, $scope.users_connected);
      });
   });

   Socket.on('msg:general', function(msg) {
      if ($scope.msgsList && $scope.chat) {
         $scope.msgsG.push(msg);
      }
   });

   Socket.on('msg:private', function(msg) {
      $scope.setChat(msg);
   });

   $scope.$on('$destroy', function(event) {
      Socket.init();
   });
});