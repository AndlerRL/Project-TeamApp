var app= angular.module('Teamapp');

app.controller('chatCtrl', function($scope, $stateParams, $state, Socket, Session, ChatService) {
   $scope.usersConnected= [];
   $scope.chat= null;
   $scope.msgsList= [];
   $scope.msg= {};

   $scope.msgsG= [];
   $scope.msgs= [];
   
   if ($scope.usersConnected.length <= 0) {
      Socket.emit('users');
   }

   $scope.getChatType= function(callback) {
      var id= $state.params.hasOwnProperty('id_chat');
      if (id) {
         callback($state.params.id_chat);
      } else {
         callback('general');
      }
      $scope.msgsList[$scope.chat]= [];
   };

   $scope.whereIam= function(callback) {
      $scope.getChatType(function(type) {
         $scope.chat= type;
         if (typeof callback == 'function') {
            callback($scope.chat);
         }
      });
   };

   $scope.sendGeneralMsg= function() {
      var data= {};
      data= {
         content: $scope.msg,
         type: "general"
      };
      ChatService.sendMsg(data).then(function(response) {
         data.sender= response.data.sender;
      });
      Socket.emit('new:msg:general', data);
      $scope.msg= "";
   }

   $scope.sendPrivateMsg= function() {
      var data= {};
      data= {
         content: $scope.msg,
         type: 'private',
         receiver: { _id: $scope.other._id.toString() },
         chat: $scope.chat
      };
      console.log(data);
      ChatService.sendMsg(data).success(function(response) {
         console.log(response);
         data.sender= response.msgs[0].sender;
         //$scope.msgs.push(response.msgs);
         $scope.setChat(data);
         Socket.emit('new:msg:private', data);
         $scope.msg= "";
      }).error(function(response) {
         console.error(response);
      });
   }

   $scope.goToChat= function(destiny) {
      ChatService.createGiveConversation({ receiver: destiny }).success(function(response) {
         if (response.chat.type == 'private') {
            $state.go('app.chat.private', { id_chat: response.chat._id });
            $scope.I= response.I;
            $scope.other= response.other;
         } else {
            $state.go('app.chat.general');
         }
      });
   };

   $scope.getMsgs= function() {
      $scope.whereIam(function(chat) {
         if (chat == 'general') {
            console.log("_-|||| General ||||-_");
            $scope.goToChat('general');
            ChatService.getGeneralMsgs().success(function(response) {
               console.log(response);
               $scope.msgsG= response[0].msgs;
               console.log($scope.msgsG);
            });
         } else {
            console.log("_-|||| Private ||||-_");
            ChatService.getPrivateMsgs({
               chat: $scope.chat
            }).success(function(response) {
               $scope.goToChat(response.other._id);
               _.each(response.chat.msgs, function(msg) {
                  msg.chat= response.chat._id;
               });
               $scope.msgsList[$scope.chat]= response.chat.msgs;
            });
         }
      });
   };

   $scope.setChat= function(msg) {
      if ($scope.msgsList) {
         if (msg.chat && $scope.chat) {
            $scope.msgs.push(msg);
            $scope.msgsList[msg.chat]= $scope.msgs;
            if ($scope.msgsList.hasOwnProperty(msg.chat)) {
               $scope.$apply(function() {
                  $scope.msgsList[msg.chat].push(msg);
               });
            } else {
               $scope.msgsList[msg.chat]= new Array();
               $scope.$apply(function() {
                  $scope.msgsList[msg.chat].push(msg);
               });
            }
         }
      }
   };

   Socket.on('users:list', function(users) {
      Session.getUser().then(function(response) {
         var user= response.data.user.user;
         var connected= _.reject(users, {_id: user._id});
         angular.copy(connected, $scope.usersConnected);
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