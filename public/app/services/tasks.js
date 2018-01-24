angular.module('Teamapp').factory('TasksService', function($http) {
   return {
      getTasks: function() {
         return $http.get('/tasks');
      },
      getFinishedTasks: function() {
         return $http.get('/tasks/finished');
      },
      saveTasks: function(data) {
         return $http.post('/tasks', data);
      },
      saveFinished: function(ids) {
         return $http.post('/tasks/finished', ids);
      }
   }
});