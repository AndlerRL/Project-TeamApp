angular.module('Teamapp').controller('registryCtrl', function($scope, $http, $state) {
   $scope.user= {};
   $scope.register= function() {
      $scope.sending= true;
      $http.post('/registry', $scope.user)
      .then(function(response) {
         var data= response.data;
         if (data.success) {
            if (data.logged) {
               $state.transitionTo('app.dashboard');
            } else {
               $state.go('login');
            }
         } else {
            console.log('[Registry Error]');
            $scope.sending= false;
         }
      });
   }
});