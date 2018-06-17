angular.module('citiesApp')
    .service('setHeadersToken', ['$http', function($http){
    let token = "";
    this.userName = "guest"
    this.set = function(t){
        token = t;
        $http.defaults.headers.common['x-access-token'] = t;
        $http.defaults.headers.common['Content-Type'] = 'application/json';
        console.log("set")    }
       this.setName = function(name){
        this.userName = name;
    }
}])
    .controller('WelcomeController',['$http','$scope', 'localStorageService', 'setHeadersToken','$location', function ($http,$scope,localStorageService, setHeadersToken,$location) {


        self = this;

        

        self.random1;
        self.random2;
        self.random3;

//self.isRecoverMode = true;
        let serverUrl = 'http://localhost:3000/'

        self.signin = function(){
            var username = self.user.userName;
            var password = self.user.password;
            if(username.length>0 && password.length>0){
                $http.post(serverUrl + "Users/login", self.user)
                .then(function(response){
                    localStorageService.set("token", response.data.token)
                    setHeadersToken.set(response.data.token);
                    $scope.inCtrl.isLogin = true;
                    $scope.inCtrl.userName = username;
                    $location.path('/Main');
                }, function(response){
                    self.login.content = "Something went wrong"
                });
            }
        }

        self.showRecover = function(){
            $scope.inCtrl.isRecoverMode = !$scope.inCtrl.isRecoverMode;
     //       self.isRecoverMode = !self.isRecoverMode;
     //       alert(self.isRecoverMode)
        }
        self.recoverPassword = function(){

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

self.slideIndex = 1;

// Next/previous controls
self.plusSlides = function (n) {
  self.showSlides(self.slideIndex += n);
}

// Thumbnail image controls
self.currentSlide = function (n) {
  self.showSlides(self.slideIndex = n);
}

self.showSlides = function (n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {self.slideIndex = 1} 
  if (n < 1) {self.slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[self.slideIndex-1].style.display = 'block'; 
  dots[self.slideIndex-1].className += " active";
}

self.showSlides(self.slideIndex);

    }]);

    
    
