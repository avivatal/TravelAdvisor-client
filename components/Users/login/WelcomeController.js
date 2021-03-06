angular.module('citiesApp')
    .service('setHeadersToken', ['$http', function($http){
    let token = "";
    this.set = function(t){
        token = t;
        $http.defaults.headers.common['x-access-token'] = t;
    }}])
    .controller('WelcomeController',['$http','$scope', 'setHeadersToken','$location','localStorageModel', function ($http,$scope, setHeadersToken,$location,localStorageModel) {


        self = this;

    
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
                    $scope.$parent.isLogin = true;
                    $scope.$parent.userName = username;


                    localStorageModel.addLocalStorage("token", response.data.token)
                    localStorageModel.addLocalStorage("name",username);
                    localStorageModel.addLocalStorage("isLogin",true)
                    setHeadersToken.set(response.data.token);


                    $location.path('/Main');

                }, function(response){
                    self.login.content = "Something went wrong"
                });
            }
            localStorageModel.removeLocalStorage("newFavorites");
            localStorageModel.removeLocalStorage("removeFavorites");
        }
        self.openDialog = function(point){
            $scope.$parent.openDialog(point)
        }
        self.showRecover = function(){
           // $scope.inCtrl.isRecoverMode = !$scope.inCtrl.isRecoverMode;
           $scope.$parent.recoverPassword();
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

$(document).ready(function(){
    self.getRandomSites();
    self.showSlides(self.slideIndex);
});


    }]);

    
    
