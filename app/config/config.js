angular
    .module('app')
    .config(config);

function config($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '../views/index.html',
        controller: 'GoSleep',
        controllerAs: 'vm'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
}