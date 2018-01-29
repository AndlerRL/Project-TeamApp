var app= angular.module('Teamapp');


app.controller('chatCtrl', function($scope, $stateParams, $state, Socket, Session, ChatService, ToastService) {
   $scope.users_connected= [];
   $scope.chat= null;
   //$scope.chat= ["general", "private"];
   //$scope.msgsList= new Object();
   $scope.msgsList= [];
   //$scope.msgsList[$scope.chat]= [];

   $scope.msg= {};

   $scope.msgsPG= [];
   $scope.msgsPP= [];

   if ($scope.users_connected.length <= 0) {
      Socket.emit('users');
   }

   $scope.sendGeneralMsg= ()=> {
      Session.getUser().then(function(response) {
         var data= {};
         var username= response.data.user.user.username;
         data= {
            content: $scope.msg,
            type: 'general',
            username: username,
            date: {
               type: Date,
               default: Date()
            }
         };
         Socket.emit('new:msg:general', data);
         $scope.msg= "";
      });
   }

   $scope.sendPrivateMsg= ()=> {
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
               username: username,
               chat: $scope.chat //$scope.chat[1]
            }
         };
         $scope.msgsP.push(data);
         $scope.msgsList[$scope.chat]= $scope.msgsP; //$scope.msgsList[$scope.chat[1]]= $scope.msgsP;
         Socket.emit('new:msg:private', data);
         $scope.msg= "";
      });
   }

   $scope.goToChat= (destiny)=> {
      ChatService.createGiveConversation({ receiver : destiny }).success(function(response) {
         if (response.chat.type == 'private') {
            $state.go('app.chat.private', { id_chat : response.chat._id }); //Esto depende del id_chat
            $scope.I= response.I;
            $scope.other= response.other;
         } else {
            $state.go('app.chat.general');
         }
      });
   }

   $scope.getChatType= (callback)=> {
      var id= $stateParams.hasOwnProperty('id_chat');
      if (id) {
         callback($stateParams.id_chat);
      }
   }

   $scope.whereIam= ()=> {
      $scope.getChatType(function(type) {
         $scope.chat= type;
      });
   }; //}();

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
         $scope.msgsList[$scope.chat].push(msg);
      }
   });

   Socket.on('msg:private', function(msg) {
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
   });

   $scope.on('$destroy', function(event) {
      Socket.init();
   });
});








/*
   var app= angular.module('Teamapp');

   app.controller('chatCtrl', function($scope, $stateParams, $state, Socket, Session, ChatService) {
      $scope.usersConnected= [];
      $scope.chat= null;
      $scope.msgsPG.push(msg);
         }
      });

      Socket.on('msg:private', function(msg) {
         $scope.setChat(msg);
      });

      $scope.$on('$destroy', function(event) {
         Socket.init();
      });
   });
*/