let app = angular.module('citiesApp', ["ngRoute", 'LocalStorageModule','ngMaterial', 'ngMessages']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: 'components/Users/login/welcome.html',
            controller : 'WelcomeController as wlcmCtrl'
        })
        .when('/About', {
            templateUrl: '/components/About/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/POI', {
            templateUrl: '/components/POI/POI.html',
            controller : 'POIController as pCtrl'
        })
        .when('/register', {
            templateUrl: '/components/Users/register/Register.html',
            controller : 'RegisterController as rgCtrl'
        })
        .when('/Main', {
            templateUrl: '/components/Users/home/Main.html',
            controller : 'MainController as mnCtrl'
        })
        .when('/favorites', {
            templateUrl: 'components/Users/favorites/favorites.html',
            controller : 'FavoritesController as fvCtrl'
        })
        .otherwise({ redirectTo: '/' });

        
}]);











