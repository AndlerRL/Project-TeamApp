angular.module('Teamapp').factory('ResourcesService', function($http) {
   return {
      getReceivedResources: function() {
         return $http.get('/resources/received');
      },
      getSentResources: function() {
         return $http.get('/resources/sent');
      },
      getDetail: function(resource) {
         return $http.get('/resource/' + resource.id);
      }
   }
})