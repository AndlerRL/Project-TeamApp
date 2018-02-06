angular.module('Teamapp').factory('ResourcesService', function($http) {
   return {
      getReceivedResources: function() {
         return $http.get('/resources/received', {}, {
            'query': {method: 'GET', params:{resource:'received'}, isArray: true}
         });
      },
      getSentResources: function() {
         return $http.get('/resources/sent', {}, {
            'query': {method: 'GET', params:{resource:'sent'}, isArray: true}
         });
      },
      getDetail: function(resource) {
         return $http.get('/resource/' + resource.id);
      }
   }
});