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
        templateUrl: 'partials/tasks/templates/tasks.html',
        controller: 'tasksCtrl'
    }).state('app.resources', {
        url: '/resources',
        templateUrl: 'partials/resources/templates/resources.html',
        controller: 'resourcesCtrl'
    }).state('app.resources.create', {
        url: '/create',
        templateUrl: 'partials/resources/templates/create.html',
        controller: 'resourcesCtrl'
    }).state('app.resources.sent', {
        url: '/sent',
        templateUrl: 'partials/resources/templates/sent.html',
        controller: 'sentCtrl'
    }).state('app.resources.received', {
        url: '/received',
        templateUrl: 'partials/resources/templates/received.html',
        controller: 'receivedCtrl'
    }).state('app.resources.detail', {
        url: '/:id_resource',
        templateUrl: 'partials/resources/templates/details.html',
        controller: 'detailCtrl'
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