angular.module('Teamapp').factory('ChatService', function($http) {
   return {
      createGiveConversation: function(receiver) {
         return $http.post('/conversation', receiver);
      },
      sendMsg: function(data) {
         return $http.post('/message', data);
      },
      getGeneralMsgs: function() {
         return $http.get('/messages/general');
      },
      getPrivateMsgs: function(id) {
         return $http.get('/messages/' + id.chat);
      }
   };
});