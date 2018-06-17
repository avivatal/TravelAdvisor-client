let app = angular.module('citiesApp', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        // templateUrl: './index.html',
        template: '<h1>Welcome to TravelAdvisor</h1>',
        controller: 'WelcomeController as wlcmCtrl'
    })
        .when('/About', {
            templateUrl: 'components/About/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/POI', {
            templateUrl: 'components/POI/POI.html',
            controller : 'POIController as pCtrl'
        })
        .when('/register', {
            templateUrl: 'components/Users/register/Register.html',
            controller : 'RegisterController as rgCtrl'
        })
        .when('/home', {
            templateUrl: 'components/Users/home/Main.html',
            controller : 'MainController as mnCtrl'
        })
        .otherwise({ redirectTo: '/' });

        
}]);











