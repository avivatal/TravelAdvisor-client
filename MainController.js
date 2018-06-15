angular.module('citiesApp',['LocalStorageModule'])
    
    .controller('MainController',['$http','$scope', 'localStorageService', function ($http,$scope, localStorageService) {


        self = this;

        self.userName= "guest";

        self.rec1;
        self.rec2;
        self.saved1;
        self.saved2;

        let serverUrl = 'http://localhost:3000/'


        self.getRec = function(){
            $http.get(serverUrl + "Favorites/costumPopularPoints")
                .then(function(response){
                    self.rec1 = reponse.data[0];
                    self.rec2 = response.data[1];
                }, function(response){
                    alert(response.data)
            });
            
        }

        self.getRec();

        self.getSaved = function(){
            $http.get(serverUrl + "Favorites/lastSavedPoints")
                .then(function(response){
                    self.saved1 = reponse.data[0];
                    self.saved2 = response.data[1];
                }, function(response){
                    alert("Something went wrong")
            });
        }

        self.getSaved();
    }]);
    
