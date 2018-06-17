angular.module('citiesApp',['LocalStorageModule'])
.service('setHeadersToken', ['$http', function($http){
    let token = "";
    this.set = function(t){
        token = t;
        $http.defaults.headers.common['x-access-token'] = t;
        
            // $httpProvider.defaults.headers.post[ 'x-access-token' ] = token

        console.log("set")    }
}])
    .controller('MainController',['$http','$scope', 'localStorageService','setHeadersToken', function ($http,$scope, localStorageService,setHeadersToken) {


        self = this;

        self.userName= "guest";

        self.rec1;
        self.rec2;
        self.saved1;
        self.saved2;

        let serverUrl = 'http://localhost:3000/'


        self.getRec = function(){
            setHeadersToken.set(localStorageService.get("token"))
          //  $http.defaults.headers.post['x-access-token']='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImVsaTEyMyIsInBhc3N3b3JkIjoiZTEyMzQ1IiwiaWF0IjoxNTI5MTU3NDM5LCJleHAiOjE1MjkzMzAyMzl9.uEEPBMg3Yefb2acVMatCL67S6iW7HsymFhg258JSo_I';
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
    
