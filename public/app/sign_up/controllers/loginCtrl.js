angular.module('Teamapp').controller('loginCtrl', function($scope, $http, $state, ToastService, Session) {
   $scope.master= {};
   $scope.signin= function() {
      var user= {
         username: $scope.user.username,
         password: $scope.user.password
      };
      Session.logIn(user).then(function(response) {
         if (response.data.success) {
            ToastService.success('Login session successful');
            $state.transitionTo('app.dashboard');
         } else {
            ToastService.error('Authentication Error, verify your data');
            $scope.user= angular.copy($scope.master);
            $scope.form.$setPristine();
         }
      });
   }

   Session.isLogged().then(function(response) {
      var isLogged= response.data.isLogged;
      if (isLogged) {
         $state.go('app.dashboard');
      }
   });
});