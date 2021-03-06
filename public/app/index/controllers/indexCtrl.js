var app= angular.module('Teamapp');

app.controller('indexCtrl', function($rootScope, $state, $scope, Session) {
   function Module(state) {
      this.state= state.name;
      this.name= state.name.split('.')[1];
      this.getName= function() {
         return this.name && this.name[0].toUpperCase() + this.name.slice(1);
      };
   }

   $scope.module= new Module($state.current).getName();
   $scope.logout= function() {
      Session.logOut().then(function(response) {
         if (response.data.destroy) {
            $state.go('login');
         }
      });
   }

   Session.getUser().then(function(response) {
      $scope.user= response.data.user.user;
   });

   Session.isLogged().then(function(response) {
      var isLogged= response.data.isLogged;
      if (!isLogged) {
         $state.go('login');
      }
   });

   $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      $scope.module= new Module(toState).getName();
   });
});