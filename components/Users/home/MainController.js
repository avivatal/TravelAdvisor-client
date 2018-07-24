angular.module('citiesApp')
    app.controller('MainController',['$http','$scope', 'localStorageModel','setHeadersToken', function ($http,$scope, localStorageModel,setHeadersToken) {


        self = this;


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

        self.openDialog = function(point){
            $scope.$parent.openDialog(point)
        }
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



        self.slideIndex = 1;
        self.slideSaved = 1;
//        $(document).ready(function(){

//      });
        
      
      // Next/previous controls
      self.plusSlides = function(n) {
        self.showSlides(self.slideIndex += n);
      }

      self.plusSavedSlides = function (n) {
        self.showSavedSlides(self.slideSaved += n);
      }
      
      // Thumbnail image controls
       self.currentSlide = function(n) {
        self.showSlides(self.slideIndex = n);
      }

      // Thumbnail image controls
      self.currentSavedSlide = function (n){
        self.showSavedSlides(self.slideSaved = n);
      }
      
      self.showSlides = function(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) {self.slideIndex = 1} 
        if (n < 1) {self.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; 
        }
        slides[self.slideIndex-1].style.display = "block"; 
      }

      self.showSavedSlides = function(n) {
        var i;
        var slides = document.getElementsByClassName("mySavedSlides");
        if (n > slides.length) {self.slideSaved = 1} 
        if (n < 1) {self.slideSaved = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; 
        }
        slides[self.slideSaved-1].style.display = "block"; 
        
      }
      $(document).ready(function(){
            self.showSavedSlides(self.slideSaved);
        self.showSlides(self.slideIndex);
      });
    }]);
    
