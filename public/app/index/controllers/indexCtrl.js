var app= angular.module('Teamapp');

app.controller('indexCtrl', function($rootScope, $state, $scope) {
   $scope.module= new Module($state.current).getName();

   function Module(state) {
      this.state= state.name;
      this.name= state.name.split('.')[1];
      this.getName= function() {
         return this.name && this.name[0].toUpperCase() + this.name.slice(1);
      };
   }

   $rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams)=> {
      $scope.module = new Module(toState).getName();
      console.log(toState);
   });
});