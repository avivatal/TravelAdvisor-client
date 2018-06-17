angular.module('citiesApp')
    app.controller('MainController',['$http','$scope', 'localStorageService','setHeadersToken', function ($http,$scope, localStorageService,setHeadersToken) {


        self = this;

        self.userName= "guest";

        self.rec1;
        self.rec2;
        self.saved1;
        self.saved2;

        let serverUrl = 'http://localhost:3000/'


        self.getRec = function(){
          $http.get(serverUrl + "reg/Favorites/costumPopularPoints")
                .then(function(response){
                    self.rec1 = response.data[0];
                    self.rec2 = response.data[1];
                }, function(response){
                    alert(response.data)
            });
            
        }

        self.getRec();

        self.getSaved = function(){
            $http.get(serverUrl + "reg/Favorites/lastSavedPoints")
                .then(function(response){
                    self.saved1 = response.data[0];
                    self.saved2 = response.data[1];
                    
                }, function(response){
                    alert("Something went wrong")
            });
        }

        self.getSaved();
    }]);
    
