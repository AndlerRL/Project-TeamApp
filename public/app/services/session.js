angular.module('Teamapp').factory('Session', function($http, $state, $rootScope) {
   function User() {
      this.logIn= function(user) {
         return $http.post('/login', user);
      }

      this.getUser= function() {
         return $http.get('/session');
      }

      this.logOut= function() {
         return $http.post('/logout');
      }

      this.isLogged= function(user) {
         return $http.get('/session');
      }
   }

   var User= new User();
   var Session= {
      logIn: User.logIn,
      getUser: User.getUser,
      logOut: User.logOut,
      isLogged: User.isLogged
   };

   User.getUser();   User.isLogged();  return Session;
});