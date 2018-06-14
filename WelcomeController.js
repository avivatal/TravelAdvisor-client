angular.module('citiesApp',['ngMaterial'])
    .service('setHeadersToken', ['$http', function($http){
        let token = "";
        this.set = function(t){
            token = t;
            $http.defaults.headers.common['x-access-token'] = t;
        }
    }])
    .controller('WelcomeController',['$http', 'setHeadersToken', function ($http, setHeadersToken,$mdDialog) {


        self = this;

        self.userName= "";

        self.random1;
        self.random2;
        self.random3;

        let serverUrl = 'http://localhost:3000/'

        self.signin = function(){
            var username = self.user.userName;
            var password = self.user.password;
            if(username.length>0 && password.length>0){
                $http.post(serverUrl + "Users/login", self.user)
                .then(function(response){
                    setHeadersToken.set(response.data.token);
                    self.userName = username;
                }, function(response){
                    self.login.content = "Something went wrong"
                });
            }
        }

        self.recoverPassword = function(){
         /*   var confirm = $mdDialog.alert({});
            .title("Password Recovery")
            .textContent("What is your mothers maiden name?");
            $mdDialog.show(confirm).then(function(result){
            }, function(result){
                
            });*/
            
        }

        self.getRandomSites = function(){

            $http({
                url: serverUrl + "Points/newExplore", 
                method: "GET",
                params:{minRate:3}
             })
            .then(function(response){
                random1 = response.data[0];
                random2 = response.data[1];
                random3 = response.data[2];
                console.log('success')
            }, function(response){})
        }
        self.getRandomSites();
    }]);
    
