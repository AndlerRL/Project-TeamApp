var app= angular.module('Teamapp', ['ui.router']);

app.config(['$stateProvider', "$urlRouterProvider", ($stateProvider, $urlRouterProvider)=> {
    $urlRouterProvider.otherwise('/app/dashboard');
    $stateProvider.state('app', {
        url: '/app',
        templateUrl: 'partials/index/templates/index.html',
        controller: 'indexCtrl'
    }).state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'partials/dashboard/templates/dashboard.html'
    }).state('app.chat', {
        url: '/chat',
        templateUrl: 'partials/chat/templates/chat.html'
    }).state('app.tasks', {
        url: '/tasks',
        templateUrl: 'partials/tasks/templates/tasks.html'
    }).state('app.resources', {
        url: '/resources',
        templateUrl: 'partials/resources/templates/resources.html'
    });
}]);