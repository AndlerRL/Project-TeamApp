var app= angular.module('Teamapp', ['ui.router', 'ngAnimate', 'toastr']);

app.config(['$stateProvider', "$urlRouterProvider", ($stateProvider, $urlRouterProvider)=> {
    $urlRouterProvider.otherwise('/app/dashboard');
    $stateProvider.state('app', {
        url: '/app',
        templateUrl: 'partials/index/templates/index.html',
        controller: 'indexCtrl'
    }).state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'partials/dashboard/templates/dashboard.html',
        controller: 'dashboardCtrl'
    }).state('app.chat', {
        url: '/chat',
        templateUrl: 'partials/chat/templates/chat.html'
    }).state('app.tasks', {
        url: '/tasks',
        templateUrl: 'partials/tasks/templates/tasks.html'
    }).state('app.resources', {
        url: '/resources',
        templateUrl: 'partials/resources/templates/resources.html'
    }).state('registry', {
        url: '/registry',
        templateUrl: 'partials/sign_up/templates/registry.html',
        controller: 'registryCtrl'
    }).state('login', {
        url: '/login',
        templateUrl: 'partials/sign_up/templates/login.html',
        controller: 'loginCtrl'
    });
}]);