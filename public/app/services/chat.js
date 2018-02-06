angular.module('Teamapp').factory('ChatService', function($http) {
   return {
      createGiveConversation: function(receiver) {
         return $http.post('/conversation', receiver);
      },
      sendMsg: function(data) {
         return $http.post('/message', data);
      },
      getGeneralMsgs: function(data) {
         return $http.get('/messages/general', data);
      },
      getPrivateMsgs: function(id, data) {
         return $http.get('/messages/' + id.chat, data);
      }
   };
});