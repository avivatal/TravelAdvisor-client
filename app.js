let app = angular.module('citiesApp', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        template: '<h1>Welcome to TravelAdvisor</h1>'
    })
        .when('/about', {
            templateUrl: 'components/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/poi', {
            templateUrl: 'components/poi.html',
            controller : 'poiCtrl as poiCtrl'
        })
        .when('/register', {
            templateUrl: 'Register.html',
            //controller : 'RegisterController'
        })
        .otherwise({ redirectTo: '/' });

        
}]);











