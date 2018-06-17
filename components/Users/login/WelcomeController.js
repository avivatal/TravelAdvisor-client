angular.module('citiesApp',['LocalStorageModule'])
.service('setHeadersToken', ['$http', function($http){
    let token = "";
    this.set = function(t){
        token = t;
        $http.defaults.headers.common['x-access-token'] = t;
        
            // $httpProvider.defaults.headers.post[ 'x-access-token' ] = token

        console.log("set")    }
}])
    .controller('WelcomeController',['$http','$scope', 'localStorageService', 'setHeadersToken', function ($http,$scope,localStorageService, setHeadersToken) {


        self = this;

        

        self.random1;
        self.random2;
        self.random3;

        self.isRecoverMode = true;
        let serverUrl = 'http://localhost:3000/'

        self.signin = function(){
            var username = self.user.userName;
            var password = self.user.password;
            if(username.length>0 && password.length>0){
                $http.post(serverUrl + "Users/login", self.user)
                .then(function(response){
                    localStorageService.set("token", response.data.token)
                    setHeadersToken.set(response.data.token)
                    self.userName = username;
                }, function(response){
                    self.login.content = "Something went wrong"
                });
            }
        }

        self.showRecover = function(){
            self.isRecoverMode = !self.isRecoverMode;
        }
        self.recoverPassword = function(){
         /*   var confirm = $mdDialog.alert({});
            .title("Password Recovery")
            .textContent("What is your mothers maiden name?");
            $mdDialog.show(confirm).then(function(result){
            }, function(result){
                
            });*/

            $http.post(serverUrl+'Users/passwordRecovery',self.recover)
            .then(function(response){
                alert('Your password is '+ response.data)
            },function(response){
                alert('Invalid parameters')
            })
        }

        self.getRandomSites = function(){

            $http({
                url: serverUrl + "Points/newExplore/1", 
                method: "GET",
             })
            .then(function(response){
                self.random1 = response.data[0];
                self.random2 = response.data[1];
                self.random3 = response.data[2];
                console.log('success')
            }, function(response){})
        }
        self.getRandomSites();
    }]);
    
